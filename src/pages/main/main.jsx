import './styles.scss';
import {useState} from "react";

function Main() {

    const [borders, setBorders] = useState([
        {id: 1, title: 'Категорийные менеджеры, менеджеры товарных категорий ОСТиУ ОГ НПО', items: ['', '', '']},
        {id: 2, title: 'Руководители отдела сопутствующих товаров и услуг (ОСТиУ)', items: ['', '', '']},
        {id: 3, title: 'Сотрудники АЗК', items: ['', '', '']},
    ])

    const [cardList, setCardList] = useState([
        {id: 1, order: 1, text: 'Распределение полочного пространства по группам товаров'},
        {id: 2, order: 1, text: 'Анализ влияния продаж сопутствующих товаров и услуг на трафик нефтепродуктов'},
        {id: 3, order: 1, text: 'Повышение конкурентоспособности сети в регионе'},
        {id: 4, order: 2, text: 'Разработка и внедрение планограмм категорий'},
        {id: 5, order: 2, text: 'Обеспечение конкурентоспособной цены'},
        {id: 6, order: 2, text: 'Взаимодействие с поставщиками и производителями'},
        {id: 7, order: 3, text: 'Размещение заказа поставщик, контроль заказа и приемка'},
        {
            id: 8,
            order: 3,
            text: 'Сокращение издержек за счет работы с товарным запасом и достижения минимальных списаний'
        },
        {id: 9, order: 3, text: 'Обеспечение стандартов выкладки '},
    ]);

    const [currentItem, setCurrentItem] = useState(cardList[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentBoard, setCurrentBoard] = useState(borders[0]);
    const [currentBoardItemIndex, setCurrentBoardItemIndex] = useState(0);

    const [style, setStyle] = useState('')

    // срабатывает в тот момент, когда мы взяли карточку
    function dragStartHandler(e, board, card, type) {
        setCurrentBoard(board);
        console.log(currentBoard)
        setCurrentItem(card);
        console.log(card)
    }

    // когда отпустили перемещение
    function dragEndHandler(e) {
        // e.target.style.background = '0 2px 3px gray';
    }

    // когда находимся над другим объектом
    function dragOverHandler(e) {
        e.preventDefault();
        // if (e.target.className === 'card') {
        //     e.target.style.boxShadow = '0 2px 3px red';
        // }
    }

    // если отпустили карточку и ждем какое-то связанное с ними действие
    function dropHandler(e, board, card) {
        e.preventDefault();

        setStyle('card-done')
        console.log(style);
        console.log('loh')

        // if(e.target.className === 'wrapper__content-card-item') {
        //     e.target.className = 'wrapper__content-card-item-done';
        // }

        // const currentIndex = currentBoard.items.indexOf(currentItem);
        // currentBoard.items.splice(currentIndex, 1);
        // индекс элемента, над которым мы держим карточку, то есть элемент после которого мы поместим текущий
        // const dropIndex = board.items.indexOf(currentItem);
        // ?? зачем это? setCurrentBoardItemIndex(() => Number(e.target.id));

        let test = Number(e.target.id);
        console.log(Number(e.target.id));
        console.log(test);


        setCurrentBoard((board.items.map((el, i,arr) => {
            if(i===test) {
                arr[i] = card.text;
            }
            if(board.id!==board.id) {
                console.log()
            }
        })));

        setBorders(() => borders)

        console.log(currentBoard)

        console.log(board);

        setCurrentIndex(() => cardList.indexOf(card));

        setCurrentItem(() => {
            return cardList[currentIndex + 1];

        });
        setCardList(cardList.slice(currentIndex+1));


        // setBorders(borders.map(b => {
        //     if (b.id === board.id) {
        //         return board;
        //     }
        //     if (b.id === currentBoard.id) {
        //         return currentBoard;
        //     }
        // }))
    }

    // срабатывает, когда мы вышли за пределами объекта
    function dragLeaveHandler(e) {
        // e.target.style.background = 'red';
    }

    return (
        <div className={'wrapper'}>
            <div className={'wrapper-xs'}>
                <h2>Задание</h2>
                <span>Распределите задачи по соответствующим уровням категорийных менеджеров.</span>
                <div className={'wrapper__content'}>
                    {borders.map((board, index) =>
                        <div className={'wrapper__content-card'} key={borders.id}>
                            <h4>{board.title}</h4>
                            {board.items.map((card, indexCard) =>
                                <div className={'wrapper__content-card-item'} id={ indexCard } key={board.id}
                                     onDragOver={(e) => dragOverHandler(e)}
                                     onDragLeave={(e) => dragLeaveHandler(e)}
                                     onDragStart={(e) => dragStartHandler(e, board, currentItem)}
                                     onDragEnd={(e) => dragEndHandler(e)}
                                     onDrop={(e) => dropHandler(e, board, currentItem)}
                                     draggable={true}

                                >
                                    <div>
                                        {card}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={'card'}>
                    {cardList.map((card, i, array) => {

                        if (i < 1) {
                            return <div key={i}
                                // срабатывает в тот момент, когда мы взяли карточку
                                        onDragStart={(event) => dragStartHandler(event, currentBoard, currentItem)}
                                // срабатывает, когда мы вышли за пределы другой карточки
                                        onDragLeave={(event) => dragEndHandler(event)}
                                // когда отпустили перемещение
                                        onDragEnd={(event) => dragEndHandler(event)}
                                // когда находимя над другим объектом
                                        onDragOver={(event) => dragOverHandler(event)}
                                // если отпустили карточку и ждем какое-то связанное с ними действие
                                        onDrop={(event) => dropHandler(event, currentBoard, currentItem)}
                                        draggable={true}
                            >
                                {currentItem?.text}
                            </div>
                        }

                    })}
                </div>
            </div>
        </div>
    );
}

export default Main;