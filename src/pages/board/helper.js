import { seItems } from "../../store/item/action";

const colums = {
  PENDING: {
    name: "To do",
    items: [],
  },
  IN_PROGRESS: {
    name: "In Progress",
    items: [],
  },
  DONE: {
    name: "Done",
    items: [],
  },
};

export const getItemsFromBD = (ref, forceUpdate) => (dispatch) => {
  ref.onSnapshot((snapshot) => {
    // dispatch(seItems(columnsFromBackend));
    const states = Object.keys(colums);
    states.forEach((st) => {
      colums[st].items = [];
    });
    snapshot.forEach((doc) => {
      colums[doc.data().state]?.items.push({
        id: doc.id,
        content: doc.data().name,
      });
    });

    dispatch(seItems(colums));
    forceUpdate();
  });
};

//import firebase from "../../boot/firebase";
/*
const ref = firebase.firestore().collection("boards");
export const getNestedCollectionFromFirestoreTable = (path) => (dispatch) => {
  ref.onSnapshot((snapshot) => {
    if (snapshot.docChanges().every((change) => change.type === "added")) {
      // Handledispatch(seItems(columnsFromBackend));
      dispatch({
        type: GET_DATA_WITH_CHILD,
        childKey: childCollectionId,
        table: subCollection,
        payload: snapshot.docs.map((doc) => ({
          ...doc.data(),
          ref: doc.ref,
        })),
      });
    } else {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case "added":
            dispatch({
              type: ADD_DATA_WITH_CHILD,
              childKey: childCollectionId,
              table: subCollection,
              payload: { ...change.doc.data(), ref: change.doc.ref },
            });
            break;
          case "modified":
            dispatch({
              type: UPDATE_DATA_WITH_CHILD,
              childKey: childCollectionId,
              table: subCollection,
              payload: { ...change.doc.data(), ref: change.doc.ref },
            });
            break;
          case "removed":
            dispatch({
              type: DELETE_DATA_WITH_CHILD,
              childKey: childCollectionId,
              table: subCollection,
              payload: change.doc.data().id,
            });
            break;
          default:
            break;
        }
      });
    }
  });
};
*/
