package com.ruoyi.system.service.impl.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ObjectUtils {
    public static List<String> collectNotNullProperties(Object object) {
        List<String> nullProperties = new ArrayList<>();
        Class<?> clazz = object.getClass();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(object);
                if (value != null) {
                    nullProperties.add(field.getName());
                }
            } catch (IllegalAccessException e) {
                // 处理异常
            }
        }
        return nullProperties;
    }
    // 根据属性名获取对象的属性值
    public static Object getPropertyValue(Object obj, String propertyName) {
        try {
            // 获取对象的类
            Class<?> clazz = obj.getClass();

            // 获取属性名为propertyName的Field对象
            Field field = clazz.getDeclaredField(propertyName);

            // 设置私有属性可访问
            field.setAccessible(true);

            // 返回属性值
            return field.get(obj);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}

