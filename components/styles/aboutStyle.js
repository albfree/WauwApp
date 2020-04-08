import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    contentText: {
        fontSize: 20,
        fontWeight: "300",
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: "justify",
        color: "black"
    },

    contentTextBold: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: "justify",
        color: "black"
    },

    homeTitle: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        color: "black"
    },

    homeImage: {
        flex: 1,
        width: "85%",
        resizeMode: "stretch",
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: "center",
        justifyContent: "center",
      }

}
);