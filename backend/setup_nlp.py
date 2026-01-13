import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download only essential packages for TextBlob functionality
required_packages = ['punkt', 'brown', 'wordnet', 'averaged_perceptron_tagger', 'punkt_tab']

print("⬇️ Downloading NLTK data...")
for package in required_packages:
    try:
        nltk.download(package, quiet=True)
        print(f"✅ {package}")
    except Exception as e:
        print(f"❌ Failed to download {package}: {e}")

print("✨ NLTK setup complete.")
