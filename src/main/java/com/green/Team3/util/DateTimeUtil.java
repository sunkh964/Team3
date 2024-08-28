package com.green.Team3.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    //자바스크립트에서 넘어온 날짜 데이터를 문자열 형태로 리턴
    public static String getFormattedStringDate(String originDate, String format){
        // 주어진 문자열
        String dateTimeString = originDate;

        // 문자열을 ZonedDateTime으로 파싱
        ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateTimeString, DateTimeFormatter.ISO_DATE_TIME);

        // ZonedDateTime을 LocalDateTime으로 변환
        LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();

        // LocalDateTime을 UTC ZonedDateTime으로 변환
        ZonedDateTime utcZonedDateTimeAgain = localDateTime.atZone(ZoneId.of("UTC"));

        // UTC ZonedDateTime을 한국 시간대로 변환
        ZonedDateTime koreanZonedDateTime = utcZonedDateTimeAgain.withZoneSameInstant(ZoneId.of("Asia/Seoul"));

        // ZonedDateTime을 문자열로 변환
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
        String formattedDateTime = koreanZonedDateTime.format(formatter);

        return formattedDateTime;
    }


}
