import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import HomeContent from "../../design/HomeContent/HomeContent";
import { fetchNews } from "../../../core/modules/news/news.api";

const HomeContainer = () => {
    const navigate = useNavigate();
    const { data: news = [], isLoading } = useQuery({
        queryKey: ["news"],
        queryFn: fetchNews,
    });

    const handleArticleClick = (slug) => navigate(`/article/${slug}`);

    return (
        <HomeContent
            articles={news}
            isLoading={isLoading}
            onArticleClick={handleArticleClick}
        />
    );
};

export default HomeContainer;
