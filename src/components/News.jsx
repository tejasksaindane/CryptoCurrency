import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/CryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("");
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 50,
  });

  const { data:cryptoData } = useGetCryptosQuery(10);
  // console.log("----------------Cryptos------------->", cryptoData?.data?.coins);

  const globalNews = data?.articles;
  // console.log("--------value--------->", globalNews);
  if (isFetching) return "Loading...";
  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurency">Cryptocurrency</Option>
              {cryptoData?.data?.coins?.map((currency) => (
                <Option key={currency.id} value={currency.name}>
                  {currency.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {globalNews?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news?.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news?.title}
                  </Title>
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <img className="news-img" src={news?.urlToImage} alt="news" />
                  <Text className="provider-name">{news.source?.name}</Text>
                  <Text>
                    {moment(news.publishedAt).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
