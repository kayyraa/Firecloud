import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import * as Fire from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

export const FirebaseConfig = {
    apiKey: "AIzaSyAXcTNB1jhacq-GimJXLXeA8eLfhO3IVuU",
    authDomain: "firecloud-adc5a.firebaseapp.com",
    projectId: "firecloud-adc5a",
    storageBucket: "firecloud-adc5a.appspot.com",
    messagingSenderId: "986570808695",
    appId: "1:986570808695:web:faa393ee88f7c53e585572",
    measurementId: "G-9VHCR4YMT1"
};

export const App = initializeApp(FirebaseConfig);
export const Analytics = getAnalytics(App);
export const Database = Fire.getFirestore(App);

export const UsersCollection = Fire.collection(Database, "users");
//export const CloudCollections = Fire.collection(UsersCollection, "cloud");

export class Cloud {
    static async AddItem(Item) {
        try {
            const DocRef = await Fire.addDoc(CloudCollections, Item);
            return DocRef;
        } catch (Error) {
            console.error(`AddItem(${Item}): `, Error);
            throw Error;
        }
    }

    static async UpdateItem(DocId, Item) {
        try {
            const DocRef = Fire.doc(CloudCollections, DocId);
            await Fire.updateDoc(DocRef, Item);
        } catch (Error) {
            console.error(`UpdateItem(${DocId}, ${Item}): `, Error);
            throw Error;
        }
    }

    static async DeleteItem(DocId) {
        try {
            const DocRef = Fire.doc(CloudCollections, DocId);
            await Fire.deleteDoc(DocRef);
        } catch (Error) {
            console.error(`DeleteItem(${DocId}): `, Error);
            throw Error;
        }
    }

    static async GetItems() {
        try {
            const Snapshot = await Fire.getDocs(CloudCollections);
            return Snapshot.docs.map((Doc) => ({ id: Doc.id, ...Doc.data() }));
        } catch (Error) {
            console.error(`GetItems(): `, Error);
            throw Error;
        }
    }

    static async GetItem(DocId) {
        try {
            const DocRef = Fire.doc(CloudCollections, DocId);
            const Doc = await Fire.getDoc(DocRef);
            return Doc.exists() ? { id: Doc.id, ...Doc.data() } : null;
        } catch (Error) {
            console.error(`GetItem(${DocId}): `, Error);
            throw Error;
        }
    }

    static async GetItemsByField(Field = "", Value) {
        try {
            const Query = Fire.query(CloudCollections, Fire.where(Field, "==", Value));
            const Snapshot = await Fire.getDocs(Query);
            return Snapshot.docs.map((Doc) => ({ id: Doc.id, ...Doc.data() }));
        } catch (Error) {
            console.error(`GetItemsByField(${Field}, ${Value}): `, Error);
            throw Error;
        }
    }
}

export class User {
    static async UserExistsByField(Field = "", Value) {
        try {
            const Query = Fire.query(UsersCollection, Fire.where(Field, "==", Value), Fire.limit(1));
            const Snapshot = await Fire.getDocs(Query);
            return !Snapshot.empty;
        } catch (Error) {
            console.error(`UserExistsByField(${Field}, ${Value}): `, Error);
            throw Error;
        }
    }

    static async GetUserByField(Field = "", Value) {
        try {
            const Query = Fire.query(UsersCollection, Fire.where(Field, "==", Value), Fire.limit(1));
            const Snapshot = await Fire.getDocs(Query);
            return Snapshot.empty ? null : Snapshot.docs[0];
        } catch (Error) {
            console.error(`GetUserByField(${Field}, ${Value}): `, Error);
            throw Error;
        }
    }

    static async AddUser(User) {
        try {
            const DocRef = await Fire.addDoc(UsersCollection, User);
            return DocRef;
        } catch (Error) {
            console.error(`AddUser(${User}): `, Error);
            throw Error;
        }
    }

    static async UpdateUser(DocId, User) {
        try {
            const DocRef = Fire.doc(UsersCollection, DocId);
            await Fire.updateDoc(DocRef, User);
        } catch (Error) {
            console.error(`UpdateUser(${DocId}, ${User}): `, Error);
            throw Error;
        }
    }

    static async RemoveUser(DocId) {
        try {
            const DocRef = Fire.doc(UsersCollection, DocId);
            await Fire.deleteDoc(DocRef);
        } catch (Error) {
            console.error(`RemoveUser(${DocId}): `, Error);
            throw Error;
        }
    }

    static async GetUsers() {
        try {
            const Snapshot = await Fire.getDocs(UsersCollection);
            return Snapshot.docs.map((Doc) => ({ id: Doc.id, ...Doc.data() }));
        } catch (Error) {
            console.error(`GetUsers(): `, Error);
            throw Error;
        }
    }

    static async GetUserById(DocId) {
        try {
            const DocRef = Fire.doc(UsersCollection, DocId);
            const Doc = await Fire.getDoc(DocRef);
            return Doc.exists() ? { id: Doc.id, ...Doc.data() } : null;
        } catch (Error) {
            console.error(`GetUserById(${DocId}): `, Error);
            throw Error;
        }
    }
}