#!/bin/bash

set -em

anvil --mnemonic 'test test test test test test test test test test test junk' --host 0.0.0.0 --block-time 1 --chain-id ${CHAIN_ID} --port ${PORT} --silent &

sleep 5

forge script LocalGCPDeployScript --rpc-url "http://127.0.0.1:${PORT}" --broadcast --silent

fg %1
