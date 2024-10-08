package com.haribo.community_service.common.exception;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {

    private final String customErrorCode;
    private final String message;
}
