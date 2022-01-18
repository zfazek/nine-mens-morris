add_library(morris
    mill.cpp
    move.cpp
    node.cpp
    table.cpp
    )

add_executable(morris.cgi
    response.cpp
    )

target_link_libraries(morris.cgi
    cgicc
    morris
    )

add_subdirectory(test)
