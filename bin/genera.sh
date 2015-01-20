#!/usr/bin/bash

APPDIR=$(dirname $(dirname $(which $0)))
BINDIR=$APPDIR/bin
TMPDIR=$APPDIR/tmp
WEBDIR=$APPDIR/web
OUTPUTDIR=$APPDIR/output

grep "Failed password for " /var/log/secure* | awk '{print $(NF-3)}' | sort -n -u > $TMPDIR/ips.txt
grep "Failed password for " /var/log/secure* | awk '{print $(NF-5)}' | sort -u > $TMPDIR/users.txt

grep "Failed password for" /var/log/secure* | awk -v cols=$TMPDIR/ips.txt -v rows=$TMPDIR/users.txt -f $BINDIR/genera2.awk > $OUTPUTDIR/file.csv
cp $OUTPUTDIR/file.csv $WEBDIR
