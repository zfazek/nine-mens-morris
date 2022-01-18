project(Nine-Mens-Morris)

cmake_minimum_required(VERSION 2.8)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set (CMAKE_CXX_FLAGS "-std=c++17 -g -O3 -Werror -Wall -pthread")
enable_testing()

add_subdirectory(src)
