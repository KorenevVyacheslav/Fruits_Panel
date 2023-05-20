// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22} 
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
    // TODO: очищаем fruitsList от вложенных элементов,
    // чтобы заполнить актуальными данными из fruits
    while (document.querySelector("li")) {   
    let li = document.querySelector('.fruits__list').firstElementChild;
    document.querySelector('.fruits__list').removeChild(li);
  }

    for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,   
    const li = document.createElement("li");
    // присваиваем класс в зависимости от цвета
        switch (fruits[i].color) {
            case 'фиолетовый': 
            li.className = "fruit__item fruit_violet";
            break;
            case 'зеленый': 
            li.className = "fruit__item fruit_green";
            break;
            case 'розово-красный': 
            li.className = "fruit__item fruit_carmazin";
            break; 
            case 'желтый': 
            li.className = "fruit__item fruit_yellow";
            break;    
            case 'светло-коричневый': 
            li.className = "fruit__item fruit_lightbrown";
            break;      
            default: 
            li.className = "fruit__item fruit_violet";
          }
    //загружаем содержимое массива в li
    li.innerHTML = `<div class = "fruit__info"> 
    <div>index: ${i}</div> 
    <div>kind: ${fruits[i].kind}</div> 
    <div>color: ${fruits[i].color}</div>
    <div>weight: ${fruits[i].weight}</div>
    </div>`;
    //добавляем созданный li в контейнер fruits__list
    document.querySelector ('.fruits__list').appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let friutsPrevios = JSON.stringify(fruits);   //сохраняем предудущий массив для сравнения
  while ( fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let temp = getRandomInt (0, fruits.length-1);
    result.push (fruits[temp]);
    fruits.splice(temp, 1);
 }
  fruits = result;
  // сравниваем два массива через JSON
  if ( friutsPrevios == JSON.stringify(fruits)) {alert ('уникальный случай: новый массив совпал c исходным!')};
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива   // убери обновление
const filterFruits = () => { 
    fruits = JSON.parse(fruitsJSON);        /*обновление массива для фильтраций*/
    fruits = fruits.filter((item) => {
    // TODO: допишите функцию
    if (item.weight>minweight && item.weight<maxweight) return (item.weight);
  });
};

filterButton.addEventListener('click', () => {
    let minweightText = document.querySelector('.minweight__input');
    let maxweightText = document.querySelector('.maxweight__input');
    minweight = parseInt (minweightText.value);
    maxweight = parseInt (maxweightText.value);
    // проверка введённых значений веса
    if (maxweight<=minweight || Number.isNaN(minweight) || Number.isNaN(maxweight) || maxweight<0 || minweight<0) {
        alert ('вы что-то перепутали в полях максимум и минимум. Проверьте и нажмите ещё раз'); 
    } else {
        filterFruits();
        display();
    }
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return (wigthColor (a) > wigthColor (b)) ? true : false;
};

/* функция извления веса цвета по цветам радуги*/
const wigthColor = (a) => {
    switch (a) {
        case 'фиолетовый':
            return 1;
            break;
            case 'зеленый':
            return 4;
            break;
            case 'желтый':
            return 5;
            break;
            case 'светло-коричневый':
            return 6;
            break;
            case 'розово-красный':
            return 7;
            break;
            default: 
            break;
    }; 
};

const sortAPI = {
    bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
        const n = arr.length;
         // внешняя итерация по элементам
        for (let i = 0; i < n-1; i++) {   
            for (let j = 0; j < n-1-i; j++) { 
                if (comparation(arr[j].color, arr[j+1].color)) { 
                let temp = arr[j+1];
                arr[j+1]= arr[j];
                arr[j] = temp;
                }
            }
        }
  },

    quickSort(arr, comparation) {
        // TODO: допишите функцию быстрой сортировки
        let more = [];
        let less = [];
        //выбираем pivot (середина массива)
        const pivot = Math.floor((arr.length-1)/2); 
        if (arr.length < 2) {
            return arr;
            }
        // разделяем массив на два массива, больше и меньше pivot
        for (i=0; i<=arr.length-1; i++)  {  
            if (i===pivot) {
              continue;
            }                            
            if (comparation(arr[i].color, arr[pivot].color)) {
                more.push(arr[i]); 
            } else less.push(arr[i]);
    }
    //повторно сортируем
    return [...sortAPI.quickSort(less, comparationColor), arr[pivot], ...sortAPI.quickSort(more, comparationColor)];
  },


    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        if (sortKind =='quickSort') { 
            fruits = sort (arr, comparation)          // quickSort возвращает массив  
          }   // quickSort возвращает массив     
        else { 
          sort(arr, comparation);                     // bubbleSort сортирует сам массив
        }                                    
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
      },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
    sortKind = (sortKind=='bubbleSort') ? 'quickSort':'bubbleSort';
    sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
    // TODO: вывести в sortTimeLabel значение 'sorting...'
    sortTimeLabel.textContent = 'sorting';
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
    // TODO: вывести в sortTimeLabel значение sortTime
    sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    // TODO: создание и добавление нового фрукта в массив fruits
    // необходимые значения берем из kindInput, colorInput, weightInput

    let weightInputInteg = parseInt (weightInput.value);
    let seltheme = document.querySelector('#selcolor').value;
    let colorTemp;
      // задаём цвет в зависимости от выбранного
      switch (seltheme) {
          case 'violet': 
          colorTemp = 'фиолетовый';
          break;
          case 'green': 
          colorTemp = 'зеленый';
          break;
          case 'carmazin': 
          colorTemp = 'розово-красный';
          break; 
          case 'yellow': 
          colorTemp = 'желтый';
          break;    
          case 'lightbrown': 
          colorTemp = 'светло-коричневый';
          break;      
          default: 
          colorTemp = 'фиолетовый';
        }

    // проверка на пустые значения и отрицательные значения
    if (Number.isNaN(weightInputInteg) ||  weightInputInteg <=0) {
        alert ('вы что-то перепутали в поле веса. Проверьте и нажмите ещё раз'); 
    } else  if (kindInput.value == '') {
        alert ('вы что-то перепутали в поле сорта. Проверьте и нажмите ещё раз');
    } else {
          // добавляем новую строку в массив
          let newArr = [ {
          kind: kindInput.value, 
          color: colorTemp, 
          weight: weightInputInteg
          } ];
          fruits = [...fruits, ...newArr];
          fruitsJSON = JSON.stringify(fruits);
          display();
      }
});

