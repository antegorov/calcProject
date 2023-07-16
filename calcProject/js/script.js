;('use strict')

const title = document.getElementsByTagName('h1')[0]
const handlerBtn = document.getElementsByClassName('handler_btn')
const plusBtn = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number ')
const inputRange = document.querySelector('.rollback input')

const rangeValue = document.querySelector('.rollback .range-value')
const totalInput = document.getElementsByClassName('total-input')
const totalInput_1 = document.getElementsByClassName('total-input')[0]
const totalInput_2 = document.getElementsByClassName('total-input')[1]
const totalInput_3 = document.getElementsByClassName('total-input')[2]
const totalInput_4 = document.getElementsByClassName('total-input')[3]
const totalInput_5 = document.getElementsByClassName('total-input')[4]
let screens = document.querySelectorAll('.screen')

const appData = {
	rollback: 10,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	start: function () {
		appData.asking()
		appData.addPrices()
		appData.getFullPrice()
		appData.getServicePercentPrices()
		appData.getTitle()
		appData.logger()
	},

	asking: function () {
		appData.title = prompt('Как называется проект?', 'Калькулятор верстки')

		for (let i = 0; i < 2; i++) {
			name = prompt('Какие типы экранов нужно разработать?')
			let price = 0
			do {
				price = prompt('Сколько будет стоить данная работа')
			} while (!appData.isNumber(price))

			appData.screens.push({ id: i, name: name, price: price })
		}

		let nameServices = []
		for (let i = 0; i < 2; i++) {
			nameServices.push(i + 1 + '_')
			nameServices[i] += prompt('Какой дополнительный тип услуги нужен?')
			let price = 0

			while (!appData.isNumber(price)) {
				price = prompt('Сколько это будет стоить?')
			}

			appData.services[nameServices[i]] = +price
		}

		appData.adaptive = confirm('Нужен ли адаптив на сайте?')
	},

	addPrices: function () {
		appData.screenPrice += appData.screens.reduce(function (sum, screen) {
			return sum + Number(screen.price)
		}, 0)

		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key]
		}
	},

	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num) && num !== null && num != ''
	},
	getRollbackMessage: function (price) {
		if (price >= 30000) return 'Даем скидку в 10%'
		else if (price >= 15000 && price < 30000) return 'Даем скидку в 5%'
		else if (price < 15000 && price >= 0) return 'Скидка не предусмотрена'
		else return 'Что-то пошло не так'
	},

	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices
	},
	getTitle: function () {
		appData.title = appData.title.replace(/^ +/, '')
		return (
			appData.title.charAt(0).toUpperCase() +
			appData.title.slice(1).toLowerCase()
		)
	},
	getServicePercentPrices: function () {
		appData.servicePercentPrice =
			appData.fullPrice - appData.fullPrice * appData.rollback * 0.01
	},

	logger: function () {
		console.log(appData.fullPrice)
		console.log(appData.servicePercentPrice)
		console.log(appData.screens)
	}
}

// appData.start()
