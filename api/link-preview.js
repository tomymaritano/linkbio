// Vercel Function para obtener link previews de forma segura
// api/link-preview.js

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Intentar obtener el HTML de la página
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
      timeout: 5000,
    });

    const html = await response.text();
    
    // Extraer meta tags usando regex
    const getMetaContent = (property) => {
      const regex = new RegExp(`<meta[^>]*(?:property|name)=["'](?:og:)?${property}["'][^>]*content=["']([^"']+)["']`, 'i');
      const match = html.match(regex);
      return match ? match[1] : null;
    };

    // Extraer datos
    const title = getMetaContent('title') || 
                  html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 
                  new URL(url).hostname;
                  
    const description = getMetaContent('description') || '';
    
    let image = getMetaContent('image');
    
    // Si la imagen es relativa, convertirla a absoluta
    if (image && !image.startsWith('http')) {
      const baseUrl = new URL(url);
      image = new URL(image, baseUrl.origin).href;
    }

    // Responder con los datos extraídos
    res.status(200).json({
      title: title.trim(),
      description: description.trim(),
      image,
      url,
    });

  } catch (error) {
    console.error('Error fetching preview:', error);
    
    // Devolver datos básicos en caso de error
    res.status(200).json({
      title: new URL(url).hostname,
      description: '',
      image: null,
      url,
    });
  }
}