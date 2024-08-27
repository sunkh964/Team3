import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelect = ({clickDate}) => {
   
   // 클릭 날짜 저장할 곳 선언
  const [changeDate, setChangeDate] = useState(clickDate);

   return (
      <DatePicker
         showIcon
         selected={changeDate}
         onChange={(date) => setChangeDate(date)}
         popperPlacement="top-end"
         showTimeSelect
         timeFormat="HH:mm"
         timeIntervals={30}
         timeCaption="time"
         dateFormat="yyyy-M-d HH:mm"
      />
      );
};

export default DateSelect;