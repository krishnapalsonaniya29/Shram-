
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Modal,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { registerWorker } from "@/api/Auth/auth_routes";
// import { MaterialIcons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// interface RouteParams {
//   mid?: string;
//   first_name?: string;
//   last_name?: string;
//   gender?: string;
//   contact_number?: string;
//   address?: string;
// }

// const rawParams = useLocalSearchParams();
// export default function SssWorkerRegister() {
//   const router = useRouter();
//   //const params = useLocalSearchParams<RouteParams>();
  

//   const [skill, setSkill] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!skill || !password) {
//       Toast.show({
//         type: "info",
//         text1: "Fill all required fields",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await registerWorker({
//         firstName: params.first_name,
//         lastName: params.last_name,
//         gender: params.gender,
//         contactNumber: params.contact_number,
//         skill,
//         address: params.address,
//         username: params.mid,
//         password,
//       });

//       if (response.success) {
//         Toast.show({
//           type: "success",
//           text1: "Registration Successful",
//         });
//         router.replace("/login");
//       } else {
//         Toast.show({
//           type: "error",
//           text1: "Registration Failed",
//         });
//       }
//     } catch {
//       Toast.show({
//         type: "error",
//         text1: "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         <LinearGradient
//           colors={["#FF9933", "#138808"]}
//           style={StyleSheet.absoluteFill}
//         />
//         <StatusBar barStyle="light-content" />

//         <LinearGradient colors={["#FF9933", "#138808"]} style={{ flex: 1 }}>
//           <ScrollView
//             contentContainerStyle={{
//               paddingVertical: "12%",
//               paddingHorizontal: "6%",
//             }}
//           >
//             {/* HEADER */}
//             <View style={styles.headerContainer}>
//               <Image
//                 source={require("../../assets/images/logo.png")}
//                 style={styles.logo}
//               />
//               <View>
//                 <Text style={styles.headerText}>
//                   GOVERNMENT OF MADHYA PRADESH
//                 </Text>
//                 <Text style={styles.subHeaderText}>
//                   Ministry of Labour & Employment
//                 </Text>
//               </View>
//             </View>

//             {/* TITLE */}
//             <View style={styles.titleContainer}>
//               <Text style={styles.titleHindi}>
//                 विवरण पुष्टि करें
//               </Text>
//               <Text style={styles.titleEnglish}>
//                 Confirm Worker Details
//               </Text>
//             </View>

//             <Text style={styles.description}>
//               The following details were retrieved from the Samagra SSS
//               database. These fields cannot be edited.
//             </Text>

//             {/* CARD */}
//             <View style={styles.card}>
//               {/* READ-ONLY SECTION */}
//               <View style={styles.readOnlyBlock}>
//                 <MaterialIcons
//                   name="verified"
//                   size={24}
//                   color="#138808"
//                   style={{ marginBottom: 10 }}
//                 />

//                 <DetailRow
//                   label="Full Name"
//                   value={`${params.first_name} ${params.last_name}`}
//                 />
//                 <DetailRow label="Gender" value={params.gender} />
//                 <DetailRow
//                   label="Contact Number"
//                   value={params.contact_number}
//                 />
//                 <DetailRow label="Address" value={params.address} />
//                 <DetailRow
//                   label="Username (SSS MID)"
//                   value={params.mid}
//                 />
//               </View>

//               {/* EDITABLE SECTION */}
//               <View style={{ marginTop: 20 }}>
//                 <Text style={styles.inputLabel}>Skill</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g., Electrician"
//                   value={skill}
//                   onChangeText={setSkill}
//                   placeholderTextColor="#B0B8C4"
//                 />

//                 <Text style={styles.inputLabel}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Create strong password"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                   placeholderTextColor="#B0B8C4"
//                 />

//                 <TouchableOpacity
//                   style={styles.primaryButton}
//                   onPress={handleRegister}
//                 >
//                   <Text style={styles.primaryText}>
//                     Create Worker Account
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* FOOTER */}
//             <View style={styles.footerContainer}>
//               <MaterialIcons
//                 name="lock"
//                 size={18}
//                 color="#fff"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={styles.footerText}>
//                 Secure Government Verified Registration
//               </Text>
//             </View>
//           </ScrollView>
//         </LinearGradient>

//         {/* LOADING MODAL */}
//         {loading && (
//           <Modal transparent animationType="fade" visible={loading}>
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator size="large" color="#FFFFFF" />
//               <Text style={styles.loadingText}>
//                 Creating Account...
//               </Text>
//             </View>
//           </Modal>
//         )}
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// /* ---------- Reusable Detail Row ---------- */

// const DetailRow = ({
//   label,
//   value,
// }: {
//   label: string;
//   value?: string;
// }) => (
//   <View style={{ marginBottom: 10 }}>
//     <Text style={styles.detailLabel}>{label}</Text>
//     <View style={styles.readOnlyField}>
//       <Text style={styles.detailValue}>{value}</Text>
//     </View>
//   </View>
// );

// /* ---------- Styles ---------- */

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   subHeaderText: {
//     color: "#f0f0f0",
//     fontSize: 12,
//   },
//   titleContainer: {
//     marginBottom: 16,
//   },
//   titleHindi: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#fff",
//   },
//   titleEnglish: {
//     fontSize: 16,
//     color: "#f0f0f0",
//     marginTop: 4,
//   },
//   description: {
//     color: "#ffffffcc",
//     marginBottom: 30,
//     lineHeight: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 24,
//     elevation: 6,
//   },
//   readOnlyBlock: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingBottom: 15,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: "#555",
//     marginBottom: 4,
//     fontWeight: "600",
//   },
//   readOnlyField: {
//     backgroundColor: "#f3f4f6",
//     padding: 10,
//     borderRadius: 8,
//   },
//   detailValue: {
//     fontSize: 14,
//     color: "#333",
//   },
//   inputLabel: {
//     fontSize: 13,
//     marginBottom: 6,
//     marginTop: 12,
//     color: "#333",
//     fontWeight: "600",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 12,
//   },
//   primaryButton: {
//     backgroundColor: "#138808",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   primaryText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 14,
//   },
//   footerContainer: {
//     marginTop: 40,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   footerText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#FFFFFF",
//     fontSize: 16,
//   },
// });
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { registerWorker } from "@/api/Auth/auth_routes";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function SssWorkerRegister() {
  const router = useRouter();

  /* ✅ Correct usage inside component */
  const rawParams = useLocalSearchParams();

  /* ✅ Safely extract params */
  const params = useMemo(() => {
    return {
      mid: rawParams.mid as string | undefined,
      first_name: rawParams.first_name as string | undefined,
      last_name: rawParams.last_name as string | undefined,
      gender: rawParams.gender as string | undefined,
      contact_number: rawParams.contact_number as string | undefined,
      address: rawParams.address as string | undefined,
    };
  }, [rawParams]);

  const [skill, setSkill] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ✅ Guard: if params missing, redirect */
  if (!params.mid) {
    router.replace("/(auth)/register");
    return null;
  }

  const handleRegister = async () => {
    if (!skill || !password) {
      Toast.show({
        type: "info",
        text1: "Fill all required fields",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await registerWorker({
        firstName: params.first_name,
        lastName: params.last_name,
        gender: params.gender,
        contactNumber: params.contact_number,
        skill,
        address: params.address,
        username: params.mid,
        password,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
        });
        router.replace("/login");
      } else {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
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
              <Text style={styles.titleHindi}>विवरण पुष्टि करें</Text>
              <Text style={styles.titleEnglish}>
                Confirm Worker Details
              </Text>
            </View>

            <Text style={styles.description}>
              The following details were retrieved from the Samagra SSS
              database. These fields cannot be edited.
            </Text>

            {/* CARD */}
            <View style={styles.card}>
              <View style={styles.readOnlyBlock}>
                <MaterialIcons
                  name="verified"
                  size={24}
                  color="#138808"
                  style={{ marginBottom: 10 }}
                />

                <DetailRow
                  label="Full Name"
                  value={`${params.first_name ?? ""} ${
                    params.last_name ?? ""
                  }`}
                />
                <DetailRow label="Gender" value={params.gender} />
                <DetailRow
                  label="Contact Number"
                  value={params.contact_number}
                />
                <DetailRow label="Address" value={params.address} />
                <DetailRow
                  label="Username (SSS MID)"
                  value={params.mid}
                />
              </View>

              {/* Editable Fields */}
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputLabel}>Skill</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Electrician"
                  value={skill}
                  onChangeText={setSkill}
                  placeholderTextColor="#B0B8C4"
                />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create strong password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#B0B8C4"
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.primaryText}>
                    Create Worker Account
                  </Text>
                </TouchableOpacity>
              </View>
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
                Secure Government Verified Registration
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>

        {/* Loading Modal */}
        {loading && (
          <Modal transparent animationType="fade" visible={loading}>
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>
                Creating Account...
              </Text>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/* ---------- Detail Row Component ---------- */

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.readOnlyField}>
      <Text style={styles.detailValue}>{value ?? "-"}</Text>
    </View>
  </View>
);

/* ---------- Styles (unchanged) ---------- */

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
  readOnlyBlock: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },
  readOnlyField: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 8,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#138808",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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