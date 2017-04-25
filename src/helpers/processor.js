import moment from 'moment'

export function getMonthLabels (expenses) {
  let timeStamps = [], monthLabels = []
  _.each(expenses, expense => {
    timeStamps.push(expense.date)
  })

  timeStamps = timeStamps.sort((a, b) => {
    return moment(a).unix() - moment(b).unix() > 0
  })

  _.map(timeStamps, stamp => {
    const formatedStamp = moment(stamp).format('MMMM YYYY')
    if (_.indexOf(monthLabels, formatedStamp) === -1) {
      monthLabels.push(formatedStamp)
    }
  })

  return monthLabels
}

export function getMonthlyProfits (expenses, months) {
  let monthProfits = []

  _.each(months, month => {
    const monthProfit = {stamp: month, value: 0}
    monthProfits.push(monthProfit)
  })

  _.each(expenses, expense => {
    _.map(monthProfits, month => {
      const formatedStamp = moment(expense.date).format('MMMM YYYY')
      if (formatedStamp === month.stamp) {
        if (expense.expense_type === 'income') {
          month.value += expense.amount
        }
        if (expense.expense_type === 'expense') {
          month.value -= expense.amount
        }
      }
    })
  })

  return monthProfits
}

export function getThisMonth (destination, source) {
  const today = moment().toDate()

  let incomes = _.filter(source, (expense) => {
    return expense.expense_type === 'income'
  })

  let expenses = _.filter(source, (expense) => {
    return expense.expense_type === 'expense'
  })

  destination.income = _.reduce(incomes, (sum, next) => {
    return moment(next.date).isSame(today, 'month') ? sum + next.amount : sum + 0
  }, 0)

  destination.expense = _.reduce(expenses, (sum, next) => {
    return moment(next.date).isSame(today, 'month') ? sum + next.amount : sum + 0
  }, 0)
}
