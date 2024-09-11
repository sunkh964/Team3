import React, { useState } from 'react';
import styled from 'styled-components';

function CustomRadio() {
  const fruits = [
    {text: '복숭아', value: 0},
    {text: '레몬', value: 1},
    {text: '사과', value: 2},
  ]
  const [selectedFruit, setSelectedFruit] = useState(null);
  const onChangeRadio = (e) => {
    setSelectedFruit(Number(e.target.value));
  }
  
  return (
    <RadioWrap>
      {
        fruits.map((fruit, idx) => (
          <label key={idx}>
            <input
              type='radio'
              name='fruits'
              value={fruit.value}
              onChange={onChangeRadio}
              checked={idx === selectedFruit}
            />
            <span className='fruit'
              style={{
                border: idx === selectedFruit ? '1px solid pink' : '1px solid lightgray',
                backgroundColor: idx === selectedFruit ? 'pink' : 'lightgray'
              }}
            >
              {fruit.text}
            </span>
          </label>
        ))
      }
    </RadioWrap>
  );
}

export default CustomRadio;

const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .fruit {
    border: 1px solid red;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #FAFAFA;
    margin: 4px;
    text-align: center;
    padding: 4px 16px;
  }`