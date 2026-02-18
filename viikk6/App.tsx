import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [barcode, setBarcode] = useState<string>("");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="grant camera access" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        videoQuality="1080p"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        //ei skannata koko aikaa, vaan disabloidaan skannaus kun viivakoodi löytyy
        onBarcodeScanned={barcode ? undefined : (res) => setBarcode(res.data)}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{barcode}</Text>
        <Button title="scan again" onPress={() => setBarcode("")}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
