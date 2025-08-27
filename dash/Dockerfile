FROM python:3.10

WORKDIR /code

RUN pip install --no-cache-dir --upgrade dash dash_cytoscape==0.2.0 gunicorn requests

COPY . /code/


CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8050", "--reload"]