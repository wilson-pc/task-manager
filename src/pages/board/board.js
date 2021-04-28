import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";
import { connect, useSelector, useDispatch } from "react-redux";
import { CreateBoardItemDialog } from "../../components";
import { withRouter } from "react-router";
import { seItems } from "../../store/item/action";
import firebase from "../../boot/firebase";
import { EditText } from "../../components";
import "./board.css";
import { getItemsFromBD } from "./helper";
const boards = firebase.firestore().collection("boards");

const onDragEnd = (boardId, result, columns, dispatch) => {
  /*
  console.log(result.source.droppableId);
  console.log(result.destination.droppableId, result.draggableId);
  if (result.source.droppableId !== result.destination.droppableId) {
    boards
      .doc(boardId)
      .collection("items")
      .doc(result.draggableId)
      .update({ state: result.destination.droppableId });
  }*/
  /*
  boards
    .doc(boardId)
    .collection("items")
    .doc(result.draggableId)
    .update({ state: result.destination.droppableId });
    */
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    boards
      .doc(boardId)
      .collection("items")
      .doc(result.draggableId)
      .update({ state: result.destination.droppableId });
    destItems.splice(destination.index, 0, removed);

    dispatch(
      seItems({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    );
  } else {
    const column = columns[source.droppableId];
    let copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    if (copiedItems[0] === undefined) {
      copiedItems = [];
    }

    dispatch(
      seItems({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    );
  }
};

function Board(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [, updateState] = useState();
  const [isDrag, setIsDrag] = useState(true);
  const forceUpdate = useCallback(() => updateState({}), []);
  const [open, setOpen] = useState(false);

  //const columnsFromBackend = useSelector((state) => state.item);
  const columnsFromBackend = useSelector((state) => state.item);

  const listenBoard = useCallback(() =>
    getItemsFromBD(boards.doc(id).collection("items"), forceUpdate)(dispatch)
  );

  const getBoard = async () => {
    await boards
      .doc(id)
      .get()
      .then((doc) => {
        if (props.loggedIn) {
          if (doc.data().userId !== props.auth.id) {
            setIsDrag(true);
          } else {
            setIsDrag(false);
          }
        } else {
          setIsDrag(true);
        }
      });
  };

  useEffect(() => {
    listenBoard();

    getBoard();
    /*
    boards
      .doc(id)
      .collection("items")
      .onSnapshot((response) => {
        const states = Object.keys(columnsFromBackend);
        states.forEach((st) => {
          columnsFromBackend[st].items = [];
        });

        response.forEach((doc) => {
          columnsFromBackend[doc.data().state]?.items.push({
            id: doc.id,
            content: doc.data().name,
          });
        });
        console.log(columnsFromBackend);
        dispatch(seItems(columnsFromBackend));

        forceUpdate();
      });
    ]*/
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateItem = (value, item) => {
    boards.doc(id).collection("items").doc(item).update({ name: value });
  };

  return (
    <div>
      {!isDrag ? (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Nuevo Item
          </Button>
          <CreateBoardItemDialog
            boardId={id}
            open={open}
            onClose={handleClose}
          />
          <br></br>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          overflow: "auto",
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(id, result, columnsFromBackend, dispatch)
          }
        >
          {Object.entries(columnsFromBackend).map(
            ([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 250,
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 8, width: "100%" }}>
                    <Droppable droppableId={columnId} key={columnId} disabled>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: "100%",
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                  isDragDisabled={isDrag}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {!isDrag ? (
                                          <EditText
                                            multiline={true}
                                            text={item.content}
                                            keyEnter={(text) => {
                                              updateItem(text, item.id);
                                            }}
                                          ></EditText>
                                        ) : (
                                          <h4>{item.content}</h4>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            }
          )}
        </DragDropContext>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
    auth: state.auth.user,
  };
}

export default connect(mapStateToProps)(withRouter(Board));
