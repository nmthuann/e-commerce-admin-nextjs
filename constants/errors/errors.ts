export enum ErrorType {
  NOT_FOUND = "Not Found!",
  PERMISSOIN_DENIED = "Permission Denied!",
  // Add more error types here
}


export enum ErrorInput{
    INPUT_INVALID = "Nhập thông tin không hợp lệ.",
    NAME_INVALID = "Tên không được chứa số hoặc khoảng trắng.",
    INPUT_WRONG_FORMAT = "Nhập thông tin sai định dạng.",
    NOT_FULL_FIELD = "Vui lòng không được bỏ trống.",
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
    EMAIL_NOT_FOUND = "Không tìm thấy email.",
    EMAIL_INVALID = "Email không hợp lệ.",

}

export enum AuthError{
  LOGIN_FAILED = "Đăng nhập thất bại."
}


export enum SystemError{
  INTERNAL_SERVER_ERROR = "Internal server error.",
  CONNECT_ERROR = "Kết nối thất bại.",
  FETCH_DATA_ERROR = 'Failed to fetch data',
}

export enum MiddlewareError{
  TOKEN_MISSING = "Bạn thiếu token.",
  TOKEN_INVALID = "Token của bạn hết hạn khoặc không hợp lệ.",
}

export enum UnknownError{
  SOMETHING_WRONG = 'Something went wrong.'
}

export enum AuthExceptionMessages {
  PASSWORD_WRONG = 'Bạn nhập sai mật khẩu.',
  LOGIN_INVAILD = 'Email hoặc Password của bạn không hợp lệ.',
  LOGIN_FAILED = 'Đăng nhập thất bại',
  EMAIL_EXIST = 'Email đã tồn tại.',
  VERIFY_MAIL_FAILED = 'Xác thực email thất bại.',
  SEND_MAIL_FAILED = 'Gửi mail thất bại.',
  REGISTER_EMPLOYEE_FAILED = 'Đăng ký Tài khoản nhân viên thất bại.',
  REGISTER_CUSTOMER_FAILED = 'Đăng ký thất bại.',
}


export enum ProductError{
  PRODUCT_ERROR = "Something went wrong.",
  PRODUCT_CREATE_FAILED = "Tạo mới một sản phẩm thất bại.",
  CHECK_INPUT_PRICE = "Giá nhập không thể lớn hơn giá bán.",
  IMAGE_WRONG_FAIL ="Ảnh sai định dạng.",
}


export enum StatusCode{
  FORBIDDEN_403 = "403 Truy cập bị từ chối vì quyền hạn không đủ.",
  UNAUTHORIZED_401 = "401 Yêu cầu không được xác thực.",

}