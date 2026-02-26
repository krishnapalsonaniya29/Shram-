// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";
// import Toast from "react-native-toast-message";

// interface SssResponse {
//   first_name: string;
//   last_name: string;
//   gender: string;
//   contact_number: string;
//   address: string;
// }

// export default function SssVerification() {
//   const router = useRouter();
//   const [mid, setMid] = useState("");
//   const [loading, setLoading] = useState(false);

//   const verifyMid = async () => {
//     if (mid.length !== 9) {
//       Toast.show({
//         type: "error",
//         text1: "SSS MID must be 9 digits",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `https://your-api.com/api/sss-mid/${mid}/`
//       );

//       if (!res.ok) throw new Error();

//       const data: SssResponse = await res.json();

//       router.push({
//         pathname: "/(auth)/sssWorkerRegister",
//         params: {
//           mid,
//           ...data,
//         },
//       });
//     } catch {
//       Toast.show({
//         type: "error",
//         text1: "Invalid SSS MID",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter 9-digit SSS MID</Text>

//       <TextInput
//         style={styles.input}
//         keyboardType="number-pad"
//         maxLength={9}
//         value={mid}
//         onChangeText={setMid}
//       />

//       <TouchableOpacity style={styles.button} onPress={verifyMid}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Verify</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 24 },
//   title: { fontSize: 18, marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#138808",
//     padding: 14,
//     borderRadius: 8,
//   },
//   buttonText: { color: "#fff", textAlign: "center" },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { getMockSssData } from "@/api/Auth/mock_sss_service";

interface SssResponse {
  first_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  address: string;
}

export default function SssVerification() {
  const router = useRouter();
  const [mid, setMid] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

//   const verifyMid = async () => {
//     if (mid.length !== 9) {
//       Toast.show({
//         type: "error",
//         text1: "SSS MID must be 9 digits",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `https://your-api.com/api/sss-mid/${mid}/`
//       );

//       if (!res.ok) throw new Error();

//       const data: SssResponse = await res.json();

//       router.push({
//         pathname: "/(auth)/sssWorkerRegister",
//         params: {
//           mid,
//           ...data,
//         },
//       });
//     } catch {
//       Toast.show({
//         type: "error",
//         text1: "Invalid SSS MID",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
const verifyMid = async () => {
  if (mid.length !== 9) {
    Toast.show({
      type: "error",
      text1: "SSS MID must be 9 digits",
    });
    return;
  }

  try {
    setLoading(true);

    const data = await getMockSssData(mid);

    router.push({
      pathname: "/(auth)/sssWorkerRegister",
      params: {
        mid,
        ...data,
      },
    });
  } catch {
    Toast.show({
      type: "error",
      text1: "Invalid SSS MID",
    });
  } finally {
    setLoading(false);
  }
};

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
                समग्र SSS MID सत्यापन
              </Text>
              <Text style={styles.titleEnglish}>
                Samagra SSS MID Verification
              </Text>
            </View>

            <Text style={styles.description}>
              Enter your 9-digit Samagra SSS MID to automatically retrieve
              your registered worker details.
            </Text>

            {/* CARD */}
            <View style={styles.card}>
              <MaterialIcons
                name="badge"
                size={60}
                color="#138808"
                style={{ marginBottom: 20 }}
              />

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>SSS MID</Text>
                <TextInput
                  style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                  ]}
                  keyboardType="number-pad"
                  maxLength={9}
                  value={mid}
                  onChangeText={setMid}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter 9-digit MID"
                  placeholderTextColor="#B0B8C4"
                />
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={verifyMid}
              >
                <Text style={styles.primaryText}>
                  सत्यापित करें • Verify
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
                Secure Government Database Verification
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>

        {/* LOADING OVERLAY */}
        {loading && (
          <Modal transparent animationType="fade" visible={loading}>
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>
                Verifying SSS MID...
              </Text>
            </View>
          </Modal>
        )}
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
    elevation: 6,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
  },
  inputFocused: {
    borderColor: "#138808",
    borderWidth: 1.5,
  },
  primaryButton: {
    backgroundColor: "#138808",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  loadingText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
});