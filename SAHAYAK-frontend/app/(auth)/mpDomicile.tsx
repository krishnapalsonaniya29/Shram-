// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// export default function MpDomicile() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Are you a domicile of Madhya Pradesh?
//       </Text>

//       <TouchableOpacity
//         style={styles.primary}
//         onPress={() => router.push("/(auth)/sssVerification")}
//       >
//         <Text style={styles.textWhite}>Yes</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.secondary}
//         //onPress={() => router.back()}  
//         onPress={() =>
//   router.replace({
//     pathname: "/(auth)/register",
//     params: { role: "Worker" },
//   })
// }
//       >
//         <Text style={styles.textGreen}>No</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 24 },
//   title: { fontSize: 18, textAlign: "center", marginBottom: 32 },
//   primary: {
//     backgroundColor: "#138808",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   secondary: {
//     borderWidth: 1,
//     borderColor: "#138808",
//     padding: 14,
//     borderRadius: 8,
//   },
//   textWhite: { color: "#fff", textAlign: "center" },
//   textGreen: { color: "#138808", textAlign: "center" },
// });
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function MpDomicile() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#FF9933", "#138808"]}
          style={StyleSheet.absoluteFill}
        />
        <StatusBar barStyle="light-content" />

        <LinearGradient colors={["#FF9933", "#138808"]} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: "12%",
              paddingHorizontal: "6%",
            }}
          >
            {/* HEADER */}
            <View style={styles.headerContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
              />
              <View>
                <Text style={styles.headerText}>
                  GOVERNMENT OF MADHYA PRADESH
                </Text>
                <Text style={styles.subHeaderText}>
                  Ministry of Labour & Employment
                </Text>
              </View>
            </View>

            {/* TITLE */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleHindi}>
                क्या आप मध्य प्रदेश के निवासी हैं?
              </Text>
              <Text style={styles.titleEnglish}>
                Are you a domicile of Madhya Pradesh?
              </Text>
            </View>

            <Text style={styles.description}>
              To enable Samagra SSS MID verification and auto-filled worker
              registration, please confirm your domicile status.
            </Text>

            {/* CARD */}
            <View style={styles.card}>
              <MaterialIcons
                name="verified-user"
                size={60}
                color="#138808"
                style={{ marginBottom: 20 }}
              />

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                  router.push("/(auth)/sssVerification")
                }
              >
                <Text style={styles.primaryText}>
                  हाँ, मैं मध्य प्रदेश का निवासी हूँ
                </Text>
                <Text style={styles.primarySubText}>
                  Yes, Verify with SSS MID
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() =>
                  router.replace({
                    pathname: "/(auth)/register",
                    params: { role: "Worker" },
                  })
                }
              >
                <Text style={styles.secondaryText}>
                  नहीं, सामान्य पंजीकरण जारी रखें
                </Text>
                <Text style={styles.secondarySubText}>
                  No, Continue Manual Registration
                </Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footerContainer}>
              <MaterialIcons
                name="lock"
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.footerText}>
                Secure & Government Verified Registration
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  subHeaderText: {
    color: "#f0f0f0",
    fontSize: 12,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleHindi: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  titleEnglish: {
    fontSize: 16,
    color: "#f0f0f0",
    marginTop: 4,
  },
  description: {
    color: "#ffffffcc",
    marginBottom: 30,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 6,
  },
  primaryButton: {
    backgroundColor: "#138808",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  primarySubText: {
    color: "#ffffffcc",
    fontSize: 12,
    marginTop: 2,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#138808",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryText: {
    color: "#138808",
    fontWeight: "700",
    fontSize: 14,
  },
  secondarySubText: {
    color: "#138808cc",
    fontSize: 12,
    marginTop: 2,
  },
  footerContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
  },
});