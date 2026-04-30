ARG IMAGE=containers.intersystems.com/intersystems/irishealth-community:2026.1
ARG IMAGE=containers.intersystems.com/intersystems/iris-community:2026.1
FROM $IMAGE

USER root
RUN apt update
RUN apt install -y git
USER irisowner

WORKDIR /home/irisowner/irisdev/

ARG TESTS=0
ARG MODULE="interoperability-sample"
ARG NAMESPACE="USER"

RUN --mount=type=bind,src=.,dst=. \
    iris start IRIS && \
	iris session IRIS < ./docker/iris/iris.script && \
    iris stop IRIS quietly && \
    git config --global --add safe.directory /home/irisowner/irisdev
