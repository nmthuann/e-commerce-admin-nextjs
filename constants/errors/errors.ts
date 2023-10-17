export enum ErrorType {
  NOT_FOUND = "Not Found!",
  PERMISSOIN_DENIED = "Permission Denied!",
  // Add more error types here
}


export enum ErrorInput{
    INPUT_INVALID = "Nhập thông tin không hợp lệ.",
    NAME_INVALID = "Tên không được chứa số hoặc khoảng trắng.",
    INPUT_WRONG_FORMAT = "Nhập thông tin sai định dạng.",
    NOT_FULL_FIELD = "Vui lòng không bỏ trống.",
    FIELD_MISSING = "bạn nhập thiếu ",
    PHONE_NUMBER_ERROR = "Số điện thoại phải có đúng 10 chữ số.",
    EMAIL_ERROR = "Nhập Email chưa đúng.",
    PASSWORD_ERROR = "Mật khẩu phải đủ 8 kí tự.",
    NUMBER_ERROR = "Vui lòng không nhập số.",
    STRING_ERROR = "Vui lòng không nhập text.",
    MAX_ERROR = "Không nhập quá ",
    MIN_ERROR = "Phải nhập đủ tối thiểu",
    NOT_SELECT_FIELD = "Vui lòng chọn ",
    LENGTH_ERROR = "Yêu cầu phải đủ",

}

export enum AuthError{
  LOGIN_FAILED = "Đăng nhập thất bại."
}


export enum SystemError{
  INTERNAL_SERVER_ERROR = "Internal server error.",
  CONNECT_ERROR = "Kết nối thất bại."
}

export enum MiddlewareError{
  TOKEN_MISSING = "Bạn thiếu token.",
  TOKEN_INVALID = "Token của bạn hết hạn khoặc không hợp lệ.",
}

export enum UnknownError{
  SOMETHING_WRONG = 'Something went wrong.'
}