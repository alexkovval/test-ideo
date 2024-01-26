import { useState } from "react";
import styles from "./Main.module.scss";
import { MakeComponentObjects, sortLines } from "../../helpers";

export const Main = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const changeText = (value) => {
    setInput(value.target.value);
    let _data = MakeComponentObjects(value.target.value);
    let arrayOfArrays = sortLines(_data);
    setData(arrayOfArrays);
  };

  return (
    <div className={styles.container}>
      <textarea onChange={(value) => changeText(value)} value={input} />
      <div className={styles.elements}>
        {data?.map((line, index) => {
          return (
            <div key={index} className={styles.line}>
              {line?.map((item, index) => {
                return (
                  <div key={index} className={styles.elementContainer}>
                    <div key={index} className={styles.element}>
                      <p className={styles.label}>{item.label}</p>
                      {item.type.toLowerCase().includes("select") && (
                        <select>
                          {Object.values(item.value).map((value, i) => (
                            <option key={i} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      )}
                      {!item.type.toLowerCase().includes("select") && (
                        <input placeholder={item.value} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
