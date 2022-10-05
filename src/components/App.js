import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
    .then(r => r.json())
    .then(data => setPizzas(data))
  },[])

  function handleFormChange(name, value) {
    setSelectedPizza({
      ...selectedPizza,
      [name]: value,
    })
  }

  function handleEditPizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.id === updatedPizza.id ? updatedPizza : pizza
    );
    setSelectedPizza(updatedPizza);
    setPizzas(updatedPizzas);
  }

  return (
    <>
      <Header />
      <PizzaForm selectedPizza={selectedPizza} handleFormChange={handleFormChange} handleEditPizza={handleEditPizza}/>
      <PizzaList pizzas={pizzas} setSelectedPizza={setSelectedPizza}/>
    </>
  );
}

export default App;
