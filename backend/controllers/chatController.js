const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

const ChatHistory = require('../modules/ChatHistaryModel')

// ✅ Predefined Questions and Answers
const passageData = require('../modules/passageModel')

const MIN_SIMILARITY_THRESHOLD = 0.6; // ✅ Minimum similarity to consider a valid match
const MAX_TOKENS = 128;
let encodedPassageData = [];

// ✅ Load TensorFlow Model
const modelPromise = use.load().then(async (model) => {
    console.log("✅ TensorFlow.js Model Loaded");
    const passageMap = await passageData.find();
    // ✅ Preload encoded questions
    encodedPassageData = await Promise.all(
        passageMap.map(async (data) => {
            const embedding = await model.embed([truncateText(data.question)]);
            const vector = embedding.arraySync()[0];
            tf.dispose(embedding);
            return {
                question: data.question.toLowerCase(),
                answer: data.answer,
                vector
            };
        })
    );

    console.log("✅ Pre-encoded Questions Loaded");
    console.log(encodedPassageData.map((data) => data.question));
    console.log(encodedPassageData.length);
    return model;
});

const truncateText = (text, maxTokens = MAX_TOKENS) =>
    text.split(" ").slice(0, maxTokens).join(" ");

const calculateCosineSimilarity = (vectorA, vectorB) => {
    const tensorA = tf.tensor1d(vectorA);
    const tensorB = tf.tensor1d(vectorB);

    const dotProduct = tf.sum(tensorA.mul(tensorB));
    const magnitudeA = tf.sqrt(tf.sum(tensorA.square()));
    const magnitudeB = tf.sqrt(tf.sum(tensorB.square()));

    const similarity = dotProduct.div(magnitudeA.mul(magnitudeB)).dataSync()[0];

    tf.dispose([tensorA, tensorB]);

    return similarity;
};

// ✅ Handle Chat Request
exports.liveChat = async (req, res, next) => {
    const userMessage = truncateText(req.body.message).toLowerCase();
    const userId = req.body.userId || "Guest";

    try {
        const model = await modelPromise;

        // ✅ Encode User Input
        const userEmbedding = await model.embed([userMessage]);
        const userVector = userEmbedding.arraySync()[0];
        tf.dispose(userEmbedding);

        let bestMatch = {
            answer: "Sorry, I don't have information on that.",
            similarity: 0.5
        };

        // ✅ Find Best Match Using Cosine Similarity
        encodedPassageData.forEach((data) => {
            const similarity = calculateCosineSimilarity(userVector, data.vector);
            if (similarity > bestMatch.similarity) {
                bestMatch = { answer: data.answer, similarity };
            }
        });

        console.log(`✅ Best Match Similarity: ${bestMatch.similarity.toFixed(2)}`);

        // ✅ If similarity is below threshold, use default response
        if (bestMatch.similarity < MIN_SIMILARITY_THRESHOLD) {
            bestMatch.answer = "Sorry, I don't have information on that.";
        }


        // ✅ Save Conversation to MongoDB
        await ChatHistory.create({
            userMessage,
            botMessage: bestMatch.answer,
            userId
        });

        res.json({ message: bestMatch.answer });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
