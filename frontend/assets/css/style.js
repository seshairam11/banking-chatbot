import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 135,
        backgroundColor: "#01aa85",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingBottom: 10,
    },
    headerImage: {
        width: 230,
        height: 60,
        resizeMode: 'contain',
    },
    headerImageContainer: {
        marginLeft: 15
    },

    headerRight: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto"
    },
    headerLeft: {
        marginRight: "auto"
    },
    iconContainer: {
        height: 45,
        width: 45,
        justifyContent: 'center',  // Align icon vertically
        alignItems: 'center',  // Align icon horizontally
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 7,
        marginHorizontal: 5,
    },
    profileImg: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
        borderRadius: 45 / 2,
    },
    backDrop: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 2000,
    },
    canvasSearch: {
        maxWidth: 320,
    },
    p30: {
        padding: 30,
    },
    mb15: {
        marginBottom: 15,
    },
    me15: {
        marginRight: 15
    },
    mb30: {
        marginBottom: 30,
    },
    pb30: {
        paddingBottom: 30,
    },
    btnPrimary: {
        backgroundColor: "#e4e3f9"
    },
    menuContainer: {
        backgroundColor: "#171717",
        position: "absolute",
        top: 130,
        right: 15,
        height: 300,
        width: 200,
        zIndex: 2001,
        padding: 10,
        borderRadius: 10,
    }
})