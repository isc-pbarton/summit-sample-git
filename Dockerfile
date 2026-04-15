ARG IMAGE=intersystemsdc/irishealth-community
ARG IMAGE=intersystemsdc/iris-community
FROM $IMAGE

WORKDIR /home/irisowner/irisdev/

ARG TESTS=0
ARG MODULE="interoperability-sample"
ARG NAMESPACE="USER"

RUN --mount=type=bind,src=.,dst=. \
    iris start IRIS && \
	iris session IRIS < iris.script && \
    iris stop IRIS quietly && \
    git config --global --add safe.directory /home/irisowner/irisdev
