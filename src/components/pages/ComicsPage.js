import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
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