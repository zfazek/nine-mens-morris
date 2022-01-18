include_directories(..)

add_executable(test_morris
    test.cpp
)

target_link_libraries(test_morris
    morris
)

add_test(test_morris test_morris)
