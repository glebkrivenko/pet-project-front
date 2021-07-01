//создаем модальное окно для кнопки Девайса(добавления типа)
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..//..//index";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import DropDown from "react-bootstrap/Dropdown";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
const CreateDevice = observer(({ show, onHide }) => {
  //интерграция с сервером
  const { device } = useContext(Context);
  //делаем инпуты добавления рабочими
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  //состояния массива характеристик
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);
  //функция добавления характеристик
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  //функция удаления характеристик
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  //функция,которая будет вызываться в том случае,когда мы выбрали файл на компьютере
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  //функция отправки запроса на сервер и добавлять новое устройство
  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <DropDown className="mt-2 mb-2">
            <DropDown.Toggle>
              {device.selectedType.name || "Выберите тип"}
            </DropDown.Toggle>
            <DropDown.Menu>
              {device.types.map((type) => (
                <DropDown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>
          <DropDown className="mt-2 mb-2">
            <DropDown.Toggle>
              {device.selectedBrand.name || "Выберите бренд"}
            </DropDown.Toggle>
            <DropDown.Menu>
              {device.brands.map((brand) => (
                <DropDown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
