import { StyleSheet } from "react-native";

const negro = "#000000";

export const styles = StyleSheet.create({

    contentText: {
        fontSize: 20,
        fontWeight: "300",
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: "justify",
        color: negro
    },

    contentTextBold: {
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 20,
        marginTop: 10,
        color: negro,
        textAlign: "justify"
    },

    homeImage: {
        flex: 1,
        resizeMode: "stretch",
        width: "85%",
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: "center",
        justifyContent: "center",
      },

    homeTitle: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        color: negro
    }

}
);