export const increase = (data, id) => {
  const newData = [...data]
  newData.forEach((item) => {
    if (item._id === id) {
      item.quantity++
    }
  })
  return {
    type: 'CART',
    payload: newData,
  }
}
