import React from 'react'

const Qna = () => {
  return (
    <div>
      <div>1:1 문의하기</div>
      <table>
        <thead>
          <tr>
            <td>제목</td>
            <td><input type='text' name='qTitle'/></td>
          </tr>
          <tr>
            <td>질문 내용</td>
            <td><input type='text' name='qContent'/></td>
          </tr>
          <tr>
            <td>답변</td>
            <td>머라머라</td>
          </tr>
        </thead>
      </table>
      <button type='button'>질문 등록</button>
      </div>
  )
}

export default Qna