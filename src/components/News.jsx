import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 })
  // const { data: cryptoNews } = useGetCryptoNewsQuery({
  //   newsCategory: "Cryptocurrency",
  // });
  console.log("----------------->", cryptoNews);
  if (!cryptoNews?.value) return "Loading...";

  return (
    <div>
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
          <col xs={24} sm={12} lg={8} key={i}>
            <Card hoverbale className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  {/* <Title className="news-title" level={4}>{news.name}</Title> */}
                </div>
              </a>
            </Card>
          </col>
        ))}
      </Row>
    </div>
  );
};

export default News;
