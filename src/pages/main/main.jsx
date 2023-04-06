import { useState } from "react";
import "./styles.scss";

function Main() {
  const [borders, setBorders] = useState([
    {
      id: 1,
      title: "Руководители отдела сопутствующих товаров и услуг (ОСТиУ)",
      items: ["", "", ""],
    },
    {
      id: 2,
      title:
        "Категорийные менеджеры, менеджеры товарных категорий ОСТиУ ОГ НПО",
      items: ["", "", ""],
    },
    { id: 3, title: "Сотрудники АЗК", items: ["", "", ""] },
  ]);

  const [cardList, setCardList] = useState([
    {
      id: 1,
      order: 1,
      text: "Распределение полочного пространства по группам товаров",
    },
    {
      id: 2,
      order: 1,
      text: "Анализ влияния продаж сопутствующих товаров и услуг на трафик нефтепродуктов",
    },
    { id: 3, order: 1, text: "Повышение конкурентоспособности сети в регионе" },
    { id: 4, order: 2, text: "Разработка и внедрение планограмм категорий" },
    { id: 5, order: 2, text: "Обеспечение конкурентоспособной цены" },
    {
      id: 6,
      order: 2,
      text: "Взаимодействие с поставщиками и производителями",
    },
    {
      id: 7,
      order: 3,
      text: "Размещение заказа поставщик, контроль заказа и приемка",
    },
    {
      id: 8,
      order: 3,
      text: "Сокращение издержек за счет работы с товарным запасом и достижения минимальных списаний",
    },
    { id: 9, order: 3, text: "Обеспечение стандартов выкладки " },
  ]);

  const [currentText, setCurrentText] = useState("");
  const [dragBoardId, setDragBoardId] = useState();

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
  }

  // опускпаем объект в область
  function onDrop(e, type) {
    e.preventDefault();

    // устанавливаем id доски и карточки, когда опустили
    const dropBoardId = Number(e.target.id[0]) + 1;
    const dropCardId = Number(e.target.id[1]);

    // когда берем карточку снизу
    if (dragBoardId === undefined) {
      setBorders(
        borders.map((b) => {
          // проверка, чтобы опустить карточку в нужное место
          if (b.id === dropBoardId) {
            b.items[dropCardId] = cardList[0].text;
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
          if (b.id === dropBoardId) {
            b.items[dropCardId] = currentText;
          }
          // при map обязательно нужно что-то возвращать!!!
          return b;
        })
      );
    }
  }

  function onDragStartCard(e) {
    setCurrentText(e.target.textContent);
    // устанавливаем id доски, чтобы переносить карточку с доски на доску
    setDragBoardId(e.target.id);
    // устанавливаем id карточки, когда мы взяли её с доски
    const dragCardId = Number(e.target.id[1]);
    setBorders(
      borders.map((b) => {
        // делаем проверку, чтобы не удалять карточку с других досок
        if (b.id === Number(e.target.id[0]) + 1) {
          b.items[dragCardId] = "";
        }
        return b;
      })
    );
  }

  function onDragCard(e) {}

  return (
    <div className="wrapper">
      <h2>задание</h2>
      <span>
        Распределите задачи по соответствующим уровням категорийных менеджеров.
      </span>
      <div className="wrapper__boarders-wrap">
        {borders?.map((board, i) => (
          <div className="wrapper__boarders-wrap-board" key={i}>
            <h3 className="wrapper__boarders-wrap-board-title">
              {board.title}
            </h3>
            {board.items.map((item, i) => (
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
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      {cardList.length && (
        <button
          className="wrapper__btn"
          draggable={true}
          onDragStart={onDragStart}
          onDrag={onDrag}
        >
          {cardList[0].text}
        </button>
      )}
    </div>
  );
}

export default Main;

// import './styles.scss';
// import {useState,useEffect} from "react";

// function Main() {

//     const [borders, setBorders] = useState([
//         {id: 1, title: 'Категорийные менеджеры, менеджеры товарных категорий ОСТиУ ОГ НПО', items: ['', '', '']},
//         {id: 2, title: 'Руководители отдела сопутствующих товаров и услуг (ОСТиУ)', items: ['', '', '']},
//         {id: 3, title: 'Сотрудники АЗК', items: ['', '', '']},
//     ])

//     const [cardList, setCardList] = useState([
//         {id: 1, order: 1, text: 'Распределение полочного пространства по группам товаров'},
//         {id: 2, order: 1, text: 'Анализ влияния продаж сопутствующих товаров и услуг на трафик нефтепродуктов'},
//         {id: 3, order: 1, text: 'Повышение конкурентоспособности сети в регионе'},
//         {id: 4, order: 2, text: 'Разработка и внедрение планограмм категорий'},
//         {id: 5, order: 2, text: 'Обеспечение конкурентоспособной цены'},
//         {id: 6, order: 2, text: 'Взаимодействие с поставщиками и производителями'},
//         {id: 7, order: 3, text: 'Размещение заказа поставщик, контроль заказа и приемка'},
//         {
//             id: 8,
//             order: 3,
//             text: 'Сокращение издержек за счет работы с товарным запасом и достижения минимальных списаний'
//         },
//         {id: 9, order: 3, text: 'Обеспечение стандартов выкладки '},
//     ]);

//     const [currentItem, setCurrentItem] = useState(cardList[0]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [currentBoard, setCurrentBoard] = useState(borders[0]);
//     const [currentBoardItemIndex, setCurrentBoardItemIndex] = useState(0);

//     const [style, setStyle] = useState('');

//     // срабатывает в тот момент, когда мы взяли карточку
//     function dragStartHandler(e, board, card, type) {
//         setCurrentBoard(board);
//         borders.map(board => {
//             console.log(board.id)
//         })
//         console.log(currentBoard.id, board.id)
//         // setCurrentItem(card);
//         console.log(card)
//     }

//     // useEffect(() => {
//     //     console.log(currentBoard);
//     // }, [currentBoard]);

//     // когда отпустили перемещение
//     function dragEndHandler(e) {
//         // e.target.style.background = '0 2px 3px gray';
//     }

//     // когда находимся над другим объектом
//     function dragOverHandler(e) {
//         e.preventDefault();
//         // if (e.target.className === 'card') {
//         //     e.target.style.boxShadow = '0 2px 3px red';
//         // }
//     }

//     // если отпустили карточку и ждем какое-то связанное с ними действие
//     function dropHandler(e, board, card) {
//         e.preventDefault();

//         setStyle('card-done')
//         console.log(style);

//         // if(e.target.className === 'wrapper__content-card-item') {
//         //     e.target.className = 'wrapper__content-card-item-done';
//         // }

//         // const currentIndex = currentBoard.items.indexOf(currentItem);
//         // currentBoard.items.splice(currentIndex, 1);
//         // индекс элемента, над которым мы держим карточку, то есть элемент после которого мы поместим текущий
//         // const dropIndex = board.items.indexOf(currentItem);
//         // ?? зачем это? setCurrentBoardItemIndex(() => Number(e.target.id));

//         let cardId = Number(e.target.id);
//         console.log(Number(e.target.id));

//         setCurrentBoard((board.items.map((el, i, arr) => {
//             console.log(board.id) // на которой закончилось действие
//             console.log(currentBoard.id) // с которой началось действие
//             if(currentBoard.id === board.id) {
//                 setCurrentItem(cardList[currentIndex + 1]);
//                 setCardList(cardList.slice(currentIndex+1));
//             }
//             if(currentBoard.id !== board.id) {
//                 console.log('ha')
//                 setCurrentItem(cardList[currentIndex + 1]);
//                 setCardList(cardList.slice(currentIndex+1));
//             }
//             if(i===cardId) {
//                 arr[i] = card.text;
//             }
//             // if(board.id!==currentBoard.id) {
//             //     console.log(board.id);
//             //     console.log(currentBoard.id)
//             //     console.log('loh')
//             // }
//             // if(board.id !== currentBoard.id) {
//             //     arr[i] = e.target.text
//             // }
//             // if(arr[i].id !== board.id) {
//             //     arr[i] = card.text;
//             // }

//         })));

//         // setBorders(borders.map(b => {
//         //     if(b.id === board.id) {
//         //         return board
//         //     }
//         //     if(b.id === currentBoard.id) {
//         //         return currentBoard
//         //     }
//         // }))

//         setCurrentIndex(() => cardList.indexOf(card));

//         // setCurrentItem(cardList[currentIndex + 1]);
//         // setCardList(cardList.slice(currentIndex+1));

//         // setCurrentBoard(currentBoard[currentIndex + 1]);
//         // setCurrentBoard(currentBoard.slice(currentItem+1));

//         // setBorders(borders.map(b => {
//         //     if (b.id === board.id) {
//         //         return board;
//         //     }
//         //     if (b.id === currentBoard.id) {
//         //         return currentBoard;
//         //     }
//         // }))
//     }

//     // срабатывает, когда мы вышли за пределами объекта
//     function dragLeaveHandler(e) {
//         // e.target.style.background = 'red';
//     }

//     return (
//         <div className={'wrapper'}>
//             <div className={'wrapper-xs'}>
//                 <h2>Задание</h2>
//                 <span>Распределите задачи по соответствующим уровням категорийных менеджеров.</span>
//                 <div className={'wrapper__content'}>
//                     {borders.map((board, boardId) =>
//                         <div className={'wrapper__content-card'} key={board.id} id={ boardId }>
//                             <h4>{board.title}</h4>
//                             {board.items.map((card, indexCard) =>
//                                 <div className={'wrapper__content-card-item'} id={ indexCard } key={`${board.id}${indexCard}`}
//                                      onDragOver={(e) => dragOverHandler(e)}
//                                      onDragLeave={(e) => dragLeaveHandler(e)}
//                                      onDragStart={(e) => dragStartHandler(e, board, currentItem)}
//                                      onDragEnd={(e) => dragEndHandler(e)}
//                                      onDrop={(e) => dropHandler(e, board, currentItem)}
//                                      draggable={true}

//                                 >
//                                     <div>
//                                         {card}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 <div className={'card'}>
//                     {cardList.map((card, i, array) => {

//                         if (i < 1) {
//                             return <div key={i}
//                                 // срабатывает в тот момент, когда мы взяли карточку
//                                         onDragStart={(event) => dragStartHandler(event, currentItem)}
//                                 // срабатывает, когда мы вышли за пределы другой карточки
//                                         onDragLeave={(event) => dragEndHandler(event)}
//                                 // когда отпустили перемещение
//                                         onDragEnd={(event) => dragEndHandler(event)}
//                                 // когда находимя над другим объектом
//                                         onDragOver={(event) => dragOverHandler(event)}
//                                 // если отпустили карточку и ждем какое-то связанное с ними действие
//                                         onDrop={(event) => dropHandler(event, currentItem)}
//                                         draggable={true}
//                             >
//                                 {currentItem?.text}
//                             </div>
//                         }

//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Main;
