import React, {useEffect} from 'react';
import * as validate from "yup";
import {useFormik} from "formik";
import "./components/style.css"
import axios from "axios";


function App() {

    const validation = useFormik({

        initialValues: {
            name: "", series: "", issuedBy: "", carYear: '', criminalRecord: "",
            sum: '', target: "", employment: "", availabilityLoans: "", pledge: "", dateOfIssue: "",
            registrationInf: "", age: ''

        },validationSchema: validate.object({
            age: validate.number().min(18).required().max(120),
            name: validate.string().required(),
            series:validate.string().required().min(4),
            issuedBy: validate.string().required("required field").min(3),
            criminalRecord:validate.string().required("required field"),
            sum:validate.number().required().min(0),
            registrationInf:validate.string().required("required field"),
            dateOfIssue:validate.date().required("required field").min(3),

        }) , onSubmit: ({age, criminalRecord, sum, target, employment, availabilityLoans, pledge}) => {
            const checkCredit = async () => {
                const headers = {'Content-Type': 'application/json',};
                await axios.post(
                    'http://localhost:5000/credit/issue',
                    {age, criminalRecord, employment, target, pledge, availabilityLoans, sum,},
                    {headers}
                ).then(response => {
                    alert(`data from server :\n 
                    message : ${response.data.message}
                    points : ${response.data.points}`
                    )
                }).catch(error => {
                        alert(`The data is incorrect`)
                    })}
            checkCredit()
        }
    })
    const up = {display: 'none',};
    const down = {display: 'block',};
    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <form onSubmit={validation.handleSubmit}
                      onReset={validation.handleReset}>
                    <h2>Кредит</h2>
                    <div>
                        <input type="text" placeholder="ФИО" name="name" onChange={validation.handleChange}
                               onBlur={validation.handleBlur} value={validation.values.name} autoComplete="off"/>
                    </div>
                    <div className="error">
                        <div className="error">{validation.touched.name && validation.errors.name ? (validation.errors.name) : null}
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="Возраст" name="age" onChange={validation.handleChange}
                               onBlur={validation.handleBlur} value={validation.values.age} autoComplete="off"
                        />
                    </div>
                    <div className="error">
                        <div className="error">
                            {validation.touched.age && validation.errors.age ? (
                                validation.errors.age) : null}
                        </div>
                    </div>
                    <div>
                        <input className="input" type="text" placeholder="паспорт" name="series" onChange={validation.handleChange}
                               onBlur={validation.handleBlur} value={validation.values.series} autoComplete="off"
                        />
                        <div className="error">
                            <div className="color-danger error">
                                {validation.touched.series && validation.errors.series ? (validation.errors.series) : null}
                            </div>
                        </div>
                        <input className="input" type="text" placeholder="Кем выдан" name="issuedBy" onChange={validation.handleChange}
                               onBlur={validation.handleBlur} value={validation.values.issuedBy} autoComplete="off"
                        />
                        <div className="error">
                            <div className="color-danger error">
                                {validation.touched.issuedBy && validation.errors.issuedBy ? (validation.errors.issuedBy) : null}
                            </div>
                        </div>
                    </div>
                    <div>
                        <input className="input" type="date" placeholder="Дата выдачи" name="dateOfIssue"
                               onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.dateOfIssue} autoComplete="off"/>
                        <div className="error">
                            <div className="color-danger error">
                                {validation.touched.dateOfIssue && validation.errors.dateOfIssue ? (validation.errors.dateOfIssue) : null}
                            </div>
                        </div>
                        <input
                            className="input" type="text" placeholder="Информация о прописке !" name="registrationInf"
                            onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.registrationInf}/>
                        <div className="error">
                            <div className="color-danger error">
                                {validation.touched.registrationInf && validation.errors.registrationInf ? (validation.errors.registrationInf) : null}
                            </div>
                        </div>
                    </div>
                    <select className="input" name="availabilityLoans"
                            onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.availabilityLoans}>
                        <option value="" label="других кредитов"/>
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                    <select className="input" placeholder="Трудоустройство" name="employment"
                            onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.employment}>
                        <option value="" label='работы'/>
                        <option value="Фрилансер">Фрилансер</option>
                        <option value="Пенсионер">Пенсионер</option>
                        <option value="Трудоустроен по трудовому договору">Трудоустроен по трудовому договору</option>
                        <option value="Собственное ИП">Собственное ИП</option>
                        <option value="Безработный">Безработный</option>
                    </select>
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.employment && validation.errors.employment ? (
                                validation.errors.employment) : null}
                        </div>
                    </div>
                    <input
                        className="input" type="text" placeholder="Сумма кредита" name="sum" onChange={validation.handleChange}
                        onBlur={validation.handleBlur} value={validation.values.sum} autoComplete="off"
                    />
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.sum && validation.errors.sum ? (
                                validation.errors.sum) : null}
                        </div>
                    </div>
                    <select
                        className="input" placeholder="Цель" name="target" onChange={validation.handleChange}
                        onBlur={validation.handleBlur} value={validation.values.target}>
                        <option value="" label=" цель "/>
                        <option value="Недвижимость">Недвижимость</option>
                        <option value="Потребительский кредит">Потребительский кредит</option>
                        <option value="Перекредитование">Перекредитование</option>
                    </select>
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.target && validation.errors.target ? (
                                validation.errors.target) : null}</div>
                    </div>

                    <select
                        className="input" placeholder="Сведения о судимости" name="criminalRecord" onChange={validation.handleChange}
                        onBlur={validation.handleBlur} value={validation.values.criminalRecord}>
                        <option value="" label="Сведения..."/>
                        <option value="Есть справка об отсутствии судимости">Есть справка об отсутствии судимости
                        </option>
                        <option value="Нет справки">Нет справки</option>
                    </select>
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.criminalRecord && validation.errors.criminalRecord ? (
                                validation.errors.criminalRecord) : null}
                        </div>
                    </div>

                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.availabilityLoans && validation.errors.availabilityLoans ? (
                                validation.errors.availabilityLoans) : null}
                        </div>
                    </div>

                    <select className="input" placeholder="Залог" name="pledge" onChange={validation.handleChange}
                            onBlur={validation.handleBlur} value={validation.values.pledge}>
                        <option value="" label="Залог "/>
                        <option value="Недвижимость">Недвижимость</option>
                        <option value="Автомобиль">Автомобиль</option>
                        <option value="Поручительство">Поручительство</option>
                    </select>
                    <input
                        style={validation.values.pledge === "Автомобиль" ? down : up} className="input"
                        type="text" placeholder="car age" name="carYear" required={validation.values.pledge === "Автомобиль"}
                        onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.carYear} autoComplete="off"/>
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.carYear && validation.errors.carYear ? (validation.errors.carYear) : null}
                        </div>
                    </div>
                    <div className="error">
                        <div className="color-danger error">
                            {validation.touched.pledge && validation.errors.pledge ? (validation.errors.pledge) : null}
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={() => {}}> Send Application
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;