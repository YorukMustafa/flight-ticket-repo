package com.flightapp.flightticketsystem.exception;

import lombok.Getter;

@Getter
public class BaseException extends RuntimeException {
    private final String messageKey;
    private final Object[] args;

    public BaseException(String messageKey) {
        super(messageKey);
        this.messageKey = messageKey;
        this.args = new Object[]{};
    }

    public BaseException(String messageKey, Object... args) {
        super(messageKey);
        this.messageKey = messageKey;
        this.args = args;
    }
}
