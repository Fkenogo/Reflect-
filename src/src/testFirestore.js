import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function testFirestore() {
  const docRef = await addDoc(collection(db, "testCollection"), {
    message: "Hello Firestore",
    createdAt: new Date()
  });

  console.log("Document written with ID:", docRef.id);

  const snapshot = await getDocs(collection(db, "testCollection"));
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

testFirestore();

export default testFirestore;
node src/testFirestore.js

// To run this test, use the command:
