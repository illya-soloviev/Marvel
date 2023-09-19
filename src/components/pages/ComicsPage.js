import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics"
                />
                <title>Marvel comics</title>
            </Helmet>
            <ErrorBoundary>
                <AppBanner/>
            </ErrorBoundary>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    );
}

export default ComicsPage;