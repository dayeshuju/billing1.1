package com.daye.common.util;

import org.apache.xmlbeans.impl.xb.xsdschema.Public;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class LangUtils {
    public static String getLang(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String lang = "zh";
        if(cookies != null && cookies.length>0){
            for (Cookie cookie:cookies) {
                if(cookie.getName().equals("Language")){
                    lang = cookie.getValue().substring(0,2);
                }
            }
        }
        return lang;
    }
}
