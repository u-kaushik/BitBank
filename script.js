// User demo accounts
const accountGBP = {
  name: 'GBP',
  owner: 'Demo Edward Mark Overington',
  movements: [1200, 4450, -200, 3050, -690, -20, 90, 7300],
  yieldRate: 1.2,
  pin: 1234,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-07-26T17:01:17.194Z',
    '2021-09-18T23:36:17.929Z',
    '2021-09-21T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const accountEUR = {
  name: 'EUR',
  owner: 'Utkarsh Kaushik',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  yieldRate: 1.2,
  pin: 1111,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-07-26T17:01:17.194Z',
    '2021-09-18T23:36:17.929Z',
    '2021-09-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const accountUSD = {
  name: 'USD',
  owner: 'Alex Bryce Collins',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  yieldRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accountETH = {
  name: 'ETH',
  owner: 'Daniel Edward Ferguson',
  movements: [20, -2, 34, -30, -2, 50, 40, -46],
  yieldRate: 5,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'ETH',
  locale: 'en-GB',
};

const accountBTC = {
  name: 'BTC',
  owner: 'Grant Henry Iglesias',
  movements: [4, 1, 70, 5, 9],
  yieldRate: 3,
  pin: 4444,

  movementsDates: [
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'BTC',
  locale: 'en-GB',
};

const accounts = [accountGBP, accountEUR, accountUSD, accountETH, accountBTC];

// UI Elements
// Labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumYield = document.querySelector('.summary__value--yield');
const labelTimer = document.querySelector('.timer');
// Container
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnDeposit = document.querySelector('.form__btn--deposit');
const btnWithdraw = document.querySelector('.form__btn--withdraw');
const btnSort = document.querySelector('.btn--sort');
// Inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputWithdrawAmount = document.querySelector(
  '.form__input--withdraw-amount'
);
const inputDepositAmount = document.querySelector(
  '.form__input--deposit-amount'
);

//Functions
// Format movement dates
const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Format currencies
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Display all movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // Sort
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // Display movement date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);
    // Display currency
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);
    // Display movement
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;
    //Insert from most recent using afterbegin
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Display top balance
const calcBalanceDisplay = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

// Display bottom summaries
const calcSummaryDisplay = function (acc) {
  // Incomings
  const incoming = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incoming, acc.locale, acc.currency);
  // Outgoings
  const outgoings = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(outgoings),
    acc.locale,
    acc.currency
  );
  // Yield
  const yieldRate = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.yieldRate) / 100)
    .reduce((acc, yieldAmount) => acc + yieldAmount, 0);
  labelSumYield.textContent = formatCurrency(
    yieldRate,
    acc.locale,
    acc.currency
  );
};

// Create usernames from accounts object
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) //calling .map on the new split array to loop over 0th index
      .join('');
  });
};
createUsernames(accounts);

// Update UI function
const updateUI = function (acc) {
  //display movements
  displayMovements(acc);
  //display bal
  calcBalanceDisplay(acc);
  //display summary
  calcSummaryDisplay(acc);
};

//Logout timer function
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //Display remaining time
    labelTimer.textContent = `${min}:${sec}`;

    //When 0, logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  //Set time to 5m
  let time = 300;
  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Create date DD/MM/YYYY, HH:MM based on user location
const createDate = function () {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};

// Login function
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI & welcome
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create & display current date
    createDate();
    //Clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    //Remove focus
    inputLoginPin.blur();
    //Reset timers
    if (timer) clearInterval(timer);
    //Start Logout timer
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

// Deposit function
btnDeposit.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputDepositAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add deposit date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
      alert('Successfully deposited');
    }, 2000);
  }
  inputDepositAmount.value = '';
});

// Transfer function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const balance = currentAccount.balance;
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Verifying validity
  if (
    amount > 0 &&
    receiverAcc &&
    balance >= amount &&
    amount < balance * 0.3 &&
    receiverAcc?.username !== currentAccount.username
  ) {
    setTimeout(function () {
      // Updating balances
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      // Updating dates
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
      alert('Successfully transferred');
    }, 2000);
  } else if (amount >= balance * 0.3) {
    alert(
      'Daily transfer limit exceeded. Can transfer up to 30% of balance per day.'
    );
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

// Withdraw function
btnWithdraw.addEventListener('click', function (e) {
  e.preventDefault();
  const balance = currentAccount.balance;
  const amount = Math.floor(inputWithdrawAmount.value);

  if (amount > 0 && amount < balance) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(-amount);
      // Add deposit date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
      alert('Successfully withdrawn');
    }, 2000);
  } else {
    alert('Insufficient funds');
  }
  inputWithdrawAmount.value = '';
});

// Sort function
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted; //Allow toggle of sorted state
});
