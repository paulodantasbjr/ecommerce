export const decrease = (data, id) => {
  const newData = [...data]
  newData.forEach((item) => {
    if (item.id === id) {
      item.quantity -= 1
    }
  })
  return {
    type: 'CART',
    payload: newData,
  }
}
