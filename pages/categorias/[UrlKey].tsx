import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"; // Importe o axios ou outra biblioteca que preferir

const TEST = () => {
  const router = useRouter();
  const { UrlKey } = router.query;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (UrlKey) {
      axios
        .get(
          `https://apiecommerce.meucurso.com.br/ProductCategories/List?UrlKey=${UrlKey}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFQSUVjb21tZXJjZSIsIkFwaUNsaWVudElkIjoiNCIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTY5NzYzNjI2NiwiZXhwIjoxNjk4MjQxMDY2LCJpYXQiOjE2OTc2MzYyNjYsImlzcyI6Imh0dHA6Ly9hcGllY29tbWVyY2UubWV1Y3Vyc28uY29tLmJyIiwiYXVkIjoiaHR0cDovL2FwaWVjb21tZXJjZS5tZXVjdXJzby5jb20uYnIifQ.fVA2b-7pVR3axwnQnttYvEjUzFew0W7N6icYFCRbWU4`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar categorias:", error);
        });
    }
  }, [UrlKey]);

  return (
    <>
      <h1>test categorias</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.Name}</li>
        ))}
      </ul>
    </>
  );
};

export default TEST;
