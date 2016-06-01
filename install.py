# coding=utf-8

__author__ = 'dev'

import sys
import os
import shutil
import json
import datetime

def install_packages():
    dep = []

    dev_dep = [
        "uglify-js"
    ]

    if os.system("npm i --save %s"%" ".join(dep)) != 0:
        return False

    if os.system("npm i --save-dev %s"%" ".join(dev_dep)) != 0:
        return False

    return True

def remove_packages():
    try:
        shutil.rmtree("node_modules")
    except Exception as e:
        pass

if __name__ == '__main__':

    if len(sys.argv) > 1 and \
            sys.argv[1] == "-f":
            remove_packages()

    if not install_packages():
        exit()

    pass
