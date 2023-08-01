import { useState } from "react";
import "./styles.scss";

function Main() {
  const initialBorders = [
    {
      id: 1,
      title: "React",
      items: [
        { text: "", order: 0 },
        { text: "", order: 0 },
        { text: "", order: 0 },
      ],
    },
    {
      id: 2,
      title: "TypeScript",
      items: [
        { text: "", order: 0 },
        { text: "", order: 0 },
        { text: "", order: 0 },
      ],
    },
    {
      id: 3,
      title: "Sass",
      items: [
        { text: "", order: 0 },
        { text: "", order: 0 },
        { text: "", order: 0 },
      ],
    },
  ];

  const [borders, setBorders] = useState(initialBorders);

  const initialCardList = [
    { order: 3, text: "Арифметические операции без использования функции calc()" },
    { order: 2, text: "Строгая типизация" },
    {
      order: 3,
      text: "Полная совместимость с CSS",
    },
    { order: 2, text: "Объектно-ориентированный подход" },
    {
      order: 1,
      text: "Использование VirtualDom",
    },
    {
      order: 2,
      text: "Поддержка новейших функций JavaScript",
    },
    { order: 1, text: "Поддержка Server-Side-Rendering" },
    {
      order: 1,
      text: "Компонентный подход",
    },
    {
      order: 3,
      text: "Использование CSS-вложенностей",
    },
  ];

  const [cardList, setCardList] = useState(initialCardList);

  const [dragBoardId, setDragBoardId] = useState();
  const [dragCardId, setDragCardId] = useState();
  const [checkBordersStatus, setCheckBordersStatus] = useState();
  const [inspection, setInspection] = useState("Проверить");
  const [result, setResult] = useState("");
  const [resultStyle, setResultStyle] = useState("");
  // let checkBordersItem = false;
  //   const [dropBoardId, setDropBoardId] = useState();
  //   const [dropCardId, setDropCardId] = useState();

  // когда только что взяли перетаскиваемый объект
  function onDragStart(e) {
    // устанавливаем id = undefined, чтобы переносить карточку снизу
    setDragBoardId(undefined);
  }

  // тащим перетаскиваемый объект
  function onDrag(e) {}

  // находимся над областью, в которую нужно перетащить
  function onDragOver(e) {
    e.preventDefault();
    // setDropBoardId(Number(e.target.id[0]));
    // setDropCardId(Number(e.target.id[1]));
  }

  // опускпаем объект в область
  function onDrop(e) {
    e.preventDefault();

    // устанавливаем id доски и карточки, когда опустили
    const dropBoardId = Number(e.target.id[0]);
    const dropCardId = Number(e.target.id[1]);

    // когда берем карточку снизу
    if (dragBoardId === undefined) {
      setBorders(
        borders.map((b) => {
          // проверка, чтобы опустить карточку в нужное место
          if (b.id === dropBoardId + 1) {
            b.items[dropCardId].text = cardList[0].text;
            b.items[dropCardId].order = cardList[0].order;
          }
          setCardList(cardList.slice(1));
          return b;
        })
      );
    }

    // когда берем карточку сбоку
    else {
      setBorders(
        borders.map((b) => {
          // делаем проверку, чтобы поместить карточку в нужное место
          if (b.id === dropBoardId + 1) {
            if (b.items[dropCardId].text === "") {
              b.items[dropCardId].text =
                borders[dragBoardId].items[dragCardId].text;
              b.items[dropCardId].order =
                borders[dragBoardId].items[dragCardId].order;
              borders[dragBoardId].items[dragCardId].text = "";
              borders[dragBoardId].items[dragCardId].order = 0;
            } else {
              if (
                borders[dragBoardId].items[dragCardId].text ===
                borders[dropBoardId].items[dropCardId].text
              ) {
                return b;
              } else {
                setCardList([
                  {
                    order: borders[dropBoardId].items[dropCardId].order,
                    text: borders[dropBoardId].items[dropCardId].text,
                  },
                  ...cardList,
                ]);
                borders[dropBoardId].items[dropCardId].text =
                  borders[dragBoardId].items[dragCardId].text;
                borders[dropBoardId].items[dropCardId].order =
                  borders[dragBoardId].items[dragCardId].order;

                borders[dragBoardId].items[dragCardId].text = "";
                borders[dragBoardId].items[dragCardId].order = 0;
              }
            }
          }
          // при map обязательно нужно что-то возвращать!!!
          return b;
        })
      );
    }
  }

  function onDragStartCard(e) {
    // устанавливаем id доски, чтобы переносить карточку с доски на доску
    setDragBoardId(Number(e.target.id[0]));
    setDragCardId(Number(e.target.id[1]));
  }

  function onDragCard(e) {}

  function checkBorders() {
    console.log(borders);
    borders.forEach((b) => {
      b.items.forEach((item, i) => {
        if (item.order !== i + 1) {
          checkResult(false);
        } else {
          checkResult(true);
        }
      });
    });
    checkBordersStatus === true
      ? setInspection()
      : setInspection("Попробовать еще раз?");
  }

  function repeat() {
    setCardList(initialCardList);
    setBorders(initialBorders);
    setInspection("Проверить");
  }

  function checkResult(i) {
    if (i === true) {
      setCheckBordersStatus(true);
      setResult("Верно!");
      setResultStyle("wrapper__card-wrap__card-check-yes");
    } else {
      setCheckBordersStatus(false);
      setResult("Неверно!");
      setResultStyle("wrapper__card-wrap__card-check-no");
    }
  }

  return (
    <div className="wrapper">
      <h2>задание</h2>
      <span>Распределите карточки по соответвующим им доскам.</span>
      <div className="wrapper__boarders-wrap">
        {borders?.map((board, i) => (
          <div className="wrapper__boarders-wrap-board" key={i}>
            <h3 className="wrapper__boarders-wrap-board-title">
              {board.title}
            </h3>

            {board.items.map((el, i) => (
              <div
                className="wrapper__boarders-wrap-board__card"
                id={`${board.id - 1}${i}`}
                draggable={true}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragStart={onDragStartCard}
                onDrag={onDragCard}
                key={`d${i}`}
              >
                {el.text}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="wrapper__card-wrap">
        {cardList.length !== 0 && (
          <div
            className="wrapper__card-wrap__card"
            draggable={true}
            onDragStart={onDragStart}
            onDrag={onDrag}
          >
            {cardList[0].text}
          </div>
        )}
        {checkBordersStatus !== undefined && (
          <div className={resultStyle}>{result}</div>
        )}
        {!cardList.length && !checkBordersStatus && (
          <div
            className="wrapper__card-wrap__card-check"
            onClick={inspection === "Проверить" ? checkBorders : repeat}
          >
            {inspection}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
