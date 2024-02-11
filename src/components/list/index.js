import { useState } from "react";
import uniqid from "uniqid";
import { validate } from "../../helpers/index";
import "./style.css";

const List = () => {
  const [list, setList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [todo, setTodo] = useState({
    photo: null, 
    tittle: '',
    description: '',
    completed: false,
    id: 0
  });

  const [errors, setErrors] = useState({
    tittle: '',
    description: '',
  });


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    const newValue = name === "photo" ? files[0] : value;
  
    setTodo(Todo => ({
      ...Todo,
      [name]: newValue
    }));
  
    const error = validate(name, newValue);
  
    setErrors(Errors => ({
      ...Errors,
      [name]: error
    }));
  
    if (name === "photo") {
      setSelectedFile(URL.createObjectURL(files[0]));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.tittle.length > 0 && errors.description.length > 0) {
      alert('Something went wrong');
    } else {
      setList([
        ...list,
        {
          ...todo,
          photo: selectedFile,
          id: uniqid(),
        },
      ]);

      setTodo({
        tittle: "",
        description: '',
        photo: null,
        completed: false,
      });

      
    }
  };

  const handleDelete = (id) => {
    setList((prevCards) => prevCards.filter((card) => card.id !== id));
  };


  return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="input">
            <label htmlFor="foto">Cards image: </label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="tittle">Cards tittle: </label>
            <input
              name="tittle"
              defaultValue={todo.tittle}
              value={todo.tittle}
              onChange={handleChange}
            />
            {errors.tittle && <p style={{ color: "red" }}>{errors.tittle}</p>}
          </div>
          <div className="input">
            <label htmlFor="description">Cards description: </label>
            <input
              name="description"
              defaultValue={todo.description}
              value={todo.description}
              onChange={handleChange}
            />
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
          </div>
          <button className="btn" type="submit">Add</button>
        </div>
      </form>
      <div className="cards">
        {list.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h3>{card.title}</h3>
            </div>
            <img
              src={card.photo} 
              alt="Selected file preview"
            />
            <p>Card tittle : {card.tittle} </p>
            <p>Card description :{card.info} </p>
            <button
                onClick={() => handleDelete(card.id)}
                className="delete-button"
              >
                <img
                  src="https://img.icons8.com/ios/24/000000/delete-sign.png"
                  alt="Delete"
                />
              </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default List;
